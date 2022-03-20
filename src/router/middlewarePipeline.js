export default function middlewarePipeline(contex, midleware, index) {
    const nextMiddleware = midleware[index];
    if (!nextMiddleware) {
        return contex;
    }
    return () => {
        nextMiddleware({
            ...contex,
            next: () => middlewarePipeline(contex, midleware, index + 1)
        });
    }
}