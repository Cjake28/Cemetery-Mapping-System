import { getAllVacantLots, createVacantLot, updateVacantLot, getVacantLotByLocation, deleteVacantLot } from '../../models/admin/vacantlot.model.js';

// Controller to get all vacant lots
export const getVacantLotsController = async (req, res) => {
  try {
    const vacantLots = await getAllVacantLots();
    res.status(200).json({
      success: true,
      message: 'Vacant lots fetched successfully',
      data: vacantLots,
    });
  } catch (error) {
    console.error("Error fetching vacant lots in controller:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vacant lots',
      error: error.message,
    });
  }
};

// Controller to create a vacant lot
export const createVacantLotController = async (req, res) => {
  const { vacantLotData } = req.body;
  const userId = req.userId;
  const { location, lat_lng_point_center } = vacantLotData;

  if (!location || !lat_lng_point_center) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingLot = await getVacantLotByLocation(location);
    
    if (existingLot) {
      return res.status(409).json({
        success: false,
        message: 'Location already exists. Please choose a different location.',
      });
    }

    const insertId = await createVacantLot(vacantLotData, userId);
    res.status(201).json({
      success: true,
      message: 'Vacant lot created successfully',
      insertId,
    });
  } catch (error) {
    console.error("Error creating vacant lot in controller:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to create vacant lot',
      error: error.message,
    });
  }
};

// Controller to update a vacant lot
export const updateVacantLotController = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!updatedData.location || !updatedData.lat_lng_point_center) {
    return res.status(400).json({
      success: false,
      message: 'Location and center point are required fields.',
    });
  }

  try {
    const affectedRows = await updateVacantLot(id, updatedData);
    if (affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: 'Vacant lot updated successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No changes made or vacant lot not found',
      });
    }
  } catch (error) {
    console.error("Error updating vacant lot in controller:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to update vacant lot',
      error: error.message,
    });
  }
};

// Controller to delete a vacant lot
export const deleteVacantLotController = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteVacantLot(id);
    if (affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: 'Vacant lot deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Vacant lot not found',
      });
    }
  } catch (error) {
    console.error("Error deleting vacant lot in controller:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete vacant lot',
      error: error.message,
    });
  }
};
