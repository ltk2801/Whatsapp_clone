export const register = async (req, res, next) => {
  try {
    res.status(201).json({
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
