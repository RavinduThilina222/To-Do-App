const ToDo = require("./../model/Todo");

// Create a new ToDo
exports.createToDo = async (req, res) => {
    try {
        const { description } = req.body;
        const todo = new ToDo({ description, completed: false, createdAt: Date.now(), updatedAt: Date.now() });
        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all ToDos
exports.getAllToDos = async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single ToDo by ID
exports.getToDoById = async (req, res) => {
    try {
        const todo = await ToDo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "ToDo not found" });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a ToDo by ID
exports.updateToDoDescription = async (req, res) => {
    try {
        const { description } = req.body;
        const todo = await ToDo.findByIdAndUpdate(
            req.params.id,
            {
                description,
                updatedAt: Date.now(),
            },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ error: "ToDo not found" });
        }
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a ToDo's complete as true by ID
exports.updateToDoCompletion = async (req, res) => {
    try {
        const todo = await ToDo.findByIdAndUpdate(
            req.params.id,
            {
                completed: true,
                updatedAt: Date.now(),
            },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ error: "ToDo not found" });
        }
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a ToDo by ID
exports.deleteToDo = async (req, res) => {
    try {
        const todo = await ToDo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "ToDo not found" });
        }
        res.json({ message: "ToDo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};