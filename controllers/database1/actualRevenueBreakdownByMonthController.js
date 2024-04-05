const { ActualRevenueBreakdownByMonth } = require('../../models/database1/ActualRevenueBreakdownByMonth');

const createRecord = async (req, res) => {
  try {
    const newRecord = await ActualRevenueBreakdownByMonth.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await ActualRevenueBreakdownByMonth.findAll();
    const formattedRecords = records.map(record => ({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      sort: record.sort,
      createdById: record.createdById,
      updatedById: record.updatedById,
      FK_FinancialYear_ID: record.FK_FinancialYear_ID,
      FK_WTT_Project_ID: record.FK_WTT_Project_ID,
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
    }));

    res.status(200).json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await ActualRevenueBreakdownByMonth.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const formattedRecord = {
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      sort: record.sort,
      createdById: record.createdById,
      updatedById: record.updatedById,
      FK_FinancialYear_ID: record.FK_FinancialYear_ID,
      FK_WTT_Project_ID: record.FK_WTT_Project_ID,
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

    res.status(200).json(formattedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await ActualRevenueBreakdownByMonth.update(req.body, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updatedRecord = await ActualRevenueBreakdownByMonth.findByPk(id);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await ActualRevenueBreakdownByMonth.destroy({
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
  updateRecord,
  deleteRecord,
};
