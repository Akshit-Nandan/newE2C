import User from '../models/User.js';
import Document from '../models/Document.js';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        user.password = undefined;

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getUserDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const documents = await Promise.all(
            user.documents.map((id) => Document.findById(id))
        );

        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};