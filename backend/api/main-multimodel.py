from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import os
from typing import Dict
import platform

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if platform.system() == "Darwin":
    if platform.processor() == "arm":
        tf.config.experimental.set_visible_devices([], "GPU")
        tf.config.threading.set_intra_op_parallelism_threads(6)
        tf.config.threading.set_inter_op_parallelism_threads(6)


MODELS: Dict[str, tf.keras.Model] = {}

CLASS_MAPPINGS = {
    "potato": [
        "Early Blight",
        "Late Blight",
        "Healthy"
    ],
    "pepper": [
        "Bacterial Spot",
        "Healthy"
    ],
    "tomato": [
        "Bacterial Spot",
        "Early Blight",
        "Late Blight",
        "Leaf Mold",
        "Septoria Leaf Spot",
        "Spider Mites",
        "Target Spot",
        "Yellow Leaf Curl Virus",
        "Mosaic Virus",
        "Healthy"
    ]
}

def load_model(plant_type: str) -> tf.keras.Model:
    """Lazy loading of models"""
    if plant_type not in MODELS:
        model_path = os.path.abspath(os.path.join(
            os.path.dirname(__file__), 
            "..", 
            "models", 
            plant_type,
            "model.keras"
        ))
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model for {plant_type} not found at {model_path}")
        
        MODELS[plant_type] = tf.keras.models.load_model(model_path)
    
    return MODELS[plant_type]

@app.get("/")
async def api_status():
    return {
        "message": "API is running",
        "supported_plants": list(CLASS_MAPPINGS.keys())
    }

@app.get("/supported-plants")
async def get_supported_plants():
    return {
        "plants": list(CLASS_MAPPINGS.keys()),
        "classes": CLASS_MAPPINGS
    }

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data))
    image = image.convert("RGB")
    image = image.resize((256, 256))
    image = np.array(image) / 255.0 
    return image

@app.post("/predict/{plant_type}")
async def predict(
    plant_type: str,
    file: UploadFile = File(...)
):
    if plant_type not in CLASS_MAPPINGS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported plant type. Supported types are: {list(CLASS_MAPPINGS.keys())}"
        )
    
    try:
        model = load_model(plant_type)
        
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)
        
        predictions = model.predict(img_batch, verbose=0)
        
        class_names = CLASS_MAPPINGS[plant_type]
        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = float(np.max(predictions[0]))
        
        top_3_indices = np.argsort(predictions[0])[-3:][::-1]
        top_3_predictions = [
            {
                "class": class_names[idx],
                "confidence": float(predictions[0][idx])
            }
            for idx in top_3_indices
        ]
        
        return {
            "predicted_class": predicted_class,
            "confidence": confidence,
            "top_3_predictions": top_3_predictions
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run(
        app, 
        host="localhost", 
        port=8000,
        workers=4
    )
