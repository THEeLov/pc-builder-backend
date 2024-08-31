import app from "../src/main"

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] RESTful API is listening on port ${port}`);
});

export default app; 