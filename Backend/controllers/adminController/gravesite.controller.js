import { Get_all_personInDB, createPersonInDB, delete_personInDB, findPersonInDB, updateLatLngPointsInDB, updatePersonInDB } from '../../models/admin/gravesite.model.js';

// Controller for getting all verified persons from the database
export async function getAllPersons(req, res) {
    try {
        const persons = await Get_all_personInDB();
        const personsWithFullname = persons.map(person => ({
            ...person,
            fullname: `${person.name} ${person.middle_name} ${person.surname}`
        }));

        res.status(200).json({
            success: true,
            persons: personsWithFullname
        });
    } catch (error) {
        console.error("Error in getAllPersons:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching persons from the database',
        });
    }
}

// Controller for creating a new person entry in the database
export async function createPerson(req, res){
    const { name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name } = req.body;
    const userId = req.userId; 

    // Simple validation
    if (!name || !middle_name || !surname || !date_of_birth || !date_of_death || !location || !burial_date || !owner_name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        // Check if the person already exists for the current user
        const existingPerson = await findPersonInDB(name, surname, date_of_birth, date_of_death, userId);

        if (existingPerson) {
            return res.status(409).json({
                success: false,
                message: 'Person already exists in the database',
            });
        }

        // If no existing person, create a new entry
        const personId = await createPersonInDB(name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name, userId);

        res.status(201).json({
            success: true,
            message: 'Person added successfully',
            personId: personId,
        });
    } catch (error) {
        console.error("Error in createPerson:", error);
        res.status(500).json({
            success: false,
            message: 'Error creating person in the database',
        });
    }
}

// Controller for deleting a person from the database
export async function deletePerson(req, res) {
    const { id } = req.params; // Extract ID from the request body
    console.log("deleteperosn: ", req.params );
    try {
        const result = await delete_personInDB(id);
        if (!result) { // If no row was affected
            return res.status(404).json({
                success: false,
                message: 'Person not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Person deleted successfully',
        });
    } catch (error) {
        console.error("Error in deletePerson:", error);
        res.status(500).json({
            success: false,
            message: 'Error deleting person from the database',
        });
    }
}

export async function updateLatLngPoints(req, res) {
    const { id } = req.params;  // Get the gravesite ID from the request params
    const { center_lat_lng} = req.body;  // Get the new lat/long points from the request body

    // Validate the input
    if (!center_lat_lng) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all four lat/lng points',
        });
    }

    try {
        // Update the lat/lng points in the database
        const updateSuccess = await updateLatLngPointsInDB(id, center_lat_lng);

        if (!updateSuccess) {
            return res.status(404).json({
                success: false,
                message: 'Gravesite not found or no changes were made',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Latitude and longitude points updated successfully',
        });
    } catch (error) {
        console.error("Error in updateLatLngPoints:", error);
        res.status(500).json({
            success: false,
            message: 'Error updating lat/lng points in the database',
        });
    }
}

// In your controller file
export async function updatePerson(req, res) {
    const { id } = req.params; // Get the gravesite ID from the request parameters
    const { name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name } = req.body;

    // Validate the input fields
    if (!name || !middle_name || !surname || !date_of_birth || !date_of_death || !location || !burial_date || !owner_name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        // Update the person in the database
        const updateSuccess = await updatePersonInDB(id, name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name);

        if (!updateSuccess) {
            return res.status(404).json({
                success: false,
                message: 'Person not found or no changes were made',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Person updated successfully',
        });
    } catch (error) {
        console.error("Error in updatePerson:", error);
        res.status(500).json({
            success: false,
            message: 'Error updating person in the database',
        });
    }
}
