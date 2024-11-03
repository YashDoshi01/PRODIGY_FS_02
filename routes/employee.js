const express = require('express');
const Employee = require('../models/Employee');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new employee
router.post('/', auth, async (req, res) => {
    const { name, position, salary, department } = req.body;
    try {
        const newEmployee = new Employee({ name, position, salary, department });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all employees
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an employee
router.put('/:id', auth, async (req, res) => {
    const { name, position, salary, department } = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, position, salary, department },
            { new: true }
        );
        if (!employee) return res.status(404).json({ msg: "Employee not found" });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an employee
router.delete('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ msg: "Employee not found" });
        res.json({ msg: "Employee deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
