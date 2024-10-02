import { Get_all_personInDB, createPersonInDB, delete_personInDB, findPersonInDB } from '../../models/admin/gravesite.model.js';

// Controller for getting all verified persons from the database
export async function getAllPersons(req, res) {
    try {
        const persons = await Get_all_personInDB();
        res.status(200).json({
            success: true,
            data: persons,
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

export async function createPerson(req, res) {
    const { fullname, date_of_birth, date_of_death, location, burial_date, expiration_date, owner_name } = req.body;

    // Simple validation
    if (!fullname || !date_of_birth || !date_of_death || !location || !burial_date || !owner_name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        // Check if the person already exists in the database
        const existingPerson = await findPersonInDB(fullname, date_of_birth, date_of_death);
        
        if (existingPerson) {
            return res.status(409).json({
                success: false,
                message: 'Person already exists in the database',
            });
        }

        // If no existing person, create a new entry
        const personId = await createPersonInDB(fullname, date_of_birth, date_of_death, location, burial_date, expiration_date, owner_name);
        
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
// Your delete function
export async function deletePerson(req, res) {
    const id = req.params.id; // Extract ID from the route parameter

    try {
        const result = await delete_personInDB(id); // Call your delete model function
        if (result.affectedRows === 0) {
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
