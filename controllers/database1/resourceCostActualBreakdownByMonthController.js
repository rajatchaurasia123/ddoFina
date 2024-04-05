// controllers/resourceCostActualBreakdownByMonthController.js
const {ResourceCostActualBreakdownByMonth} = require('../../models/database1/ResourceCostActualBreakdownByMonth');
const createRecord = async (req, res) => {
  try {
    const newRecord = await ResourceCostActualBreakdownByMonth.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await ResourceCostActualBreakdownByMonth.findAll();
    const formattedRecords = records.map(formatResourceCostRecord);
    res.status(200).json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await ResourceCostActualBreakdownByMonth.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const formattedRecord = formatResourceCostRecord(record);
    res.status(200).json(formattedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRecordByProjectId = async (projectId) => {
  const projectIdAsInt = parseInt(projectId);
  try {
    const record = await ResourceCostActualBreakdownByMonth.findAll({
      where: { FK_WTT_Project_ID: projectIdAsInt }
    });
    
    if (!record || record.length === 0) {
      console.log('Record not found');
    } else {
      // console.log('Records: ', record);
      // const formattedRecord = formatResourceCostRecord(record);
      // console.log(formattedRecord);
      return record;

    }
  } catch (error) {
    console.error('Internal Server Error:', error);
  }
};

const getResourceCostByEmployeeId = async (req, res) => {
  try {
    const resourceCost = await ResourceCostActualBreakdownByMonth.findOne({where: {FK_WTT_Employee_ID: req.params.id}});
    // console.log('res: ',resourceCost);
    if (!resourceCost) {
      return res.status(404).json({ error: 'ResourceCost not found' });
    }
    // return res.json(resourceCost);
    return resourceCost;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Express (HTTP) Handling
const getRecordByProjectIdExpress = async (req, res) => {
  const { projectId } = req.params;
  try {
    const record = await ResourceCostActualBreakdownByMonth.findAll({
      where: { FK_WTT_Project_ID: projectId }
    });
    
    if (!record || record.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    const formattedRecord = formatResourceCostRecord(record);
    res.status(200).json(formattedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to format record
const formatResourceCostRecord = (record) => {
  return {
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    sort: record.sort,
    createdById: record.createdById,
    updatedById: record.updatedById,
    FK_FinancialYear_ID: record.FK_FinancialYear_ID,
    FK_WTT_Project_ID: record.FK_WTT_Project_ID,
    FK_WTT_Employee_ID: record.FK_WTT_Employee_ID,
    monthValues: [
      { label: 'April', value: record.april, commentValue: record.aprilComment },
      { label: 'May', value: record.may, commentValue: record.mayComment },
      { label: 'June', value: record.june, commentValue: record.juneComment },
      { label: 'July', value: record.july, commentValue: record.julyComment },
      { label: 'August', value: record.august, commentValue: record.augustComment },
      { label: 'September', value: record.september, commentValue: record.septemberComment },
      { label: 'October', value: record.october, commentValue: record.octoberComment },
      { label: 'November', value: record.november, commentValue: record.novemberComment },
      { label: 'December', value: record.december, commentValue: record.decemberComment },
      { label: 'January', value: record.january, commentValue: record.januaryComment },
      { label: 'February', value: record.february, commentValue: record.februaryComment },
      { label: 'March', value: record.march, commentValue: record.marchComment },
    ],
  };
};



const updateRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await ResourceCostActualBreakdownByMonth.update(req.body, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updatedRecord = await ResourceCostActualBreakdownByMonth.findByPk(id);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await ResourceCostActualBreakdownByMonth.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordByProjectId,
  getRecordByProjectIdExpress,
  updateRecord,
  deleteRecord,
  getResourceCostByEmployeeId,
};
