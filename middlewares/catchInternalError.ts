const catchInternalError = handler => (req, res) => {
    try {
        return handler(req, res);
    } catch(err) {
        console.log('Internal Error: ', err)
        return res.status(500).json({message: 'Internal Error: ' + err.message})
    }
};

export default catchInternalError;

