import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
    Bold,
    Italic,
    Heading,
    List,
    ListOrdered,
    Link,
    Image,
    Code,
  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Camera, Filter, MessageCircle, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";

export function DialogDemo({
  markdown,
  setMarkdown,
}: {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}) {
  const handleNewPost = (event:any) => {
    event.preventDefault();
    // Handle new post creation here
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (start: string, end: string = "") => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = textarea.value.substring(
        selectionStart,
        selectionEnd
      );
      const replacement = start + selectedText + end;
      const newText =
        textarea.value.substring(0, selectionStart) +
        replacement +
        textarea.value.substring(selectionEnd);
      setMarkdown(newText);
      textarea.focus();
      textarea.setSelectionRange(
        selectionStart + start.length,
        selectionEnd + start.length
      );
    }
  };
  const formatActions = [
    {
      icon: <Bold size={18} />,
      action: () => insertMarkdown("**", "**"),
      tooltip: "Bold",
    },
    {
      icon: <Italic size={18} />,
      action: () => insertMarkdown("*", "*"),
      tooltip: "Italic",
    },
    {
      icon: <Heading size={18} />,
      action: () => insertMarkdown("### "),
      tooltip: "Heading",
    },
    {
      icon: <List size={18} />,
      action: () => insertMarkdown("- "),
      tooltip: "Unordered List",
    },
    {
      icon: <ListOrdered size={18} />,
      action: () => insertMarkdown("1. "),
      tooltip: "Ordered List",
    },
    {
      icon: <Link size={18} />,
      action: () => insertMarkdown("[", "](url)"),
      tooltip: "Link",
    },
    {
      icon: <Image size={18} />,
      action: () => insertMarkdown("![alt text](", ")"),
      tooltip: "Image",
    },
    {
      icon: <Code size={18} />,
      action: () => insertMarkdown("`", "`"),
      tooltip: "Inline Code",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-500 text-white">New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="grid">
          <Card>
            <CardContent>
              <form onSubmit={handleNewPost} className="space-y-4">
                <div>
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="mt-1 flex items-center space-x-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="w-full"
                    />
                    <Button type="button" size="icon" variant="outline">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <div className="container mx-auto p-4 max-w-4xl">
                    <Tabs defaultValue="edit" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit" className="mt-4">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {formatActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="icon"
                              onClick={action.action}
                              title={action.tooltip}
                            >
                              {action.icon}
                            </Button>
                          ))}
                        </div>
                        <Textarea
                          ref={textareaRef}
                          value={markdown}
                          onChange={(e) => setMarkdown(e.target.value)}
                          placeholder="Type your markdown here..."
                          className="w-full font-mono text-sm p-4 resize-none"
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="mt-4">
                        <ScrollArea className="w-full rounded-md border p-4">
                          <ReactMarkdown
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    {...props}
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code {...props} className={className}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
                          >
                            {markdown}
                          </ReactMarkdown>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="rounded p-1 px-2 border bg-green-500 text-white">Submit Post</Button>
            </CardFooter>
          </Card>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
