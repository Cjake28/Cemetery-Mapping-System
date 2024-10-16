import { getAllVacantLots, createVacantLot, updateVacantLot, getVacantLotByLocation } from '../../models/admin/vacantlot.model.js';

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
    const vacantLotData = req.body;
  
    try {
      // Step 1: Check if the location already exists
      const existingLot = await getVacantLotByLocation(vacantLotData.location);
      
      if (existingLot) {
        // Step 2: If location exists, send a conflict error response
        return res.status(409).json({
          success: false,
          message: 'Location already exists. Please choose a different location.',
        });
      }
  
      // Step 3: If location does not exist, proceed to create the vacant lot
      const insertId = await createVacantLot(vacantLotData);
  
      res.status(201).json({
        success: true,
        message: 'Vacant lot created successfully',
        insertId: insertId,  // returning the ID of the newly created vacant lot
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
  const { id } = req.params;  // assuming the ID of the lot to update is in the URL parameters
  const updatedData = req.body;  // assuming updated data is sent in the request body

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
