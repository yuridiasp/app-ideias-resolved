import { createApp } from "./app";

const { PORT } = process.env;

const app = createApp();

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});