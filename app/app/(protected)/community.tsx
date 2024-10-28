import { Text } from "@/components/ui/text";
import { View, StyleSheet } from "react-native";
import { H1, H2, Muted } from "@/components/ui/typography";

export default function CommunityScreen() {
	return (
		<View style={styles.container}>
			<H1 className="text-center mb-4">Community</H1>

			<View style={styles.section}>
				<H2 className="mb-2">Recent Activity</H2>
				<Muted className="mb-4">No recent activity to show</Muted>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	section: {
		marginBottom: 24,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 12,
		marginBottom: 24,
		paddingVertical: 16,
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 14,
		color: "#666",
	}
});
