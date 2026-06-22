import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import { lookup } from "mime-types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    try {
        const { path } = await params;
        const relativePath = path.join("/");

        if (relativePath.includes("..")) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const fullPath = join(process.cwd(), "public", "uploads", relativePath);

        try {
            const fileBuffer = await readFile(fullPath);
            const mimeType = lookup(relativePath) || "application/octet-stream";

            return new NextResponse(fileBuffer, {
                headers: {
                    "Content-Type": mimeType,
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        } catch (error) {
            console.error(`[Uploads Route] File not found: ${fullPath}`);
            return new NextResponse("File not found", { status: 404 });
        }
    } catch (error) {
        console.error("[Uploads Route] Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
