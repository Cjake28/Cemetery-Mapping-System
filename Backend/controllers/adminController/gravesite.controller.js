import { Get_all_personInDB, createPersonInDB, delete_personInDB, findPersonInDB } from '../../models/admin/gravesite.model.js';

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
export async function createPerson(req, res) {
    const { name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name } = req.body;
    console.log("createPerson: ",req.body);
    // Simple validation
    if (!name || !middle_name || !surname || !date_of_birth || !date_of_death || !location || !burial_date || !owner_name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        // Check if the person already exists in the database
        const existingPerson = await findPersonInDB(name, surname, date_of_birth, date_of_death);

        if (existingPerson) {
            return res.status(409).json({
                success: false,
                message: 'Person already exists in the database',
            });
        }

        // If no existing person, create a new entry
        const personId = await createPersonInDB(name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name);

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
