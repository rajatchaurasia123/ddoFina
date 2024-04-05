const moment = require('moment');

const wttCustomerController = require('../database2/wttCustomerController');
const WTTProjectController = require('../database2/WTTProjectController');
const wttEmployeeController = require('../database2/wttEmployeeController');
const resourceCostController = require('../database1/resourceCostController');
const wttProjectResourcesController = require('../database2/wttProjectResourcesController');
const { calculatePerDayWages, daysBetweenDates, calculatePercentageDays } = require('../../utils/costCalculation');

const getAllAllocatedResourceCost = async (req, res) => {
    try {
        const customers = await wttCustomerController.getAllActiveWTTCustomerNames();
        const projects = await WTTProjectController.getAllActiveProjectNames();
        const employees = await wttEmployeeController.getAllEmployeesOnlyCodeName();
        const resourceCosts = await resourceCostController.getAllResourceCosts2();
        const allocatedResources = await wttProjectResourcesController.getAllAllocatedResources();

        const combinedData = allocatedResources?.map((ar) => {
            // Find the associated Project Name
            const project = projects.find((p) => p.id === ar.FK_WTT_Project_ID);
            // Find the associated Employee name
            const employee = employees.find((e) => e.id === ar.FK_WTT_Employee_ID);
            // Find the associated Customer Name with Project
            const customer = customers.find((c) => c.id === project.FK_WTT_Customer_ID);
            
            // Assume startDate abd endDate is a Date object
            const formattedStartDate = moment(ar.startDate).format('DD/MM/YYYY');
            const formattedEndDate = moment(ar.endDate).format('DD/MM/YYYY');
            const allocatedDays = daysBetweenDates(formattedStartDate, formattedEndDate);
            const allocatedDaysPercent = (allocatedDays / 30) * 100;
            // Find the associated rcost
            const resources = resourceCosts.find((rc) => rc?.FK_WTT_Employee_ID === ar.FK_WTT_Employee_ID);

            if (resources) {
  
              const totalMonthlyCost = parseInt(resources.monthlyCostComp1) + parseInt(resources.monthlyCostComp2) + parseInt(resources.monthlyCostComp3) + parseInt(resources.monthlyCostComp4);                      
              const weekendDays = ['Saturday', 'Sunday'];
              const dailyCost = calculatePerDayWages(totalMonthlyCost, weekendDays);
              const allocatedCost = dailyCost*allocatedDays;
              //console.log('Monthly Cost: ', totalMonthlyCost);
              //console.log('Daily Cost: ', dailyCost);

              // Example usage:
              const startDate = new Date('2023-11-01');
              const endDate = new Date('2023-11-15');
              const percentage = calculatePercentageDays(ar.startDate, ar.endDate);
              console.log(`Percentage of days between ${ar.startDate.toDateString()} and ${ar.endDate.toDateString()}: ${percentage.toFixed(2)}%`);

              
              return {
                id: ar.id,
                employeeId: ar.FK_WTT_Employee_ID,
                employeeCode: employee ? employee.EmployeeCode : 'N/A',
                employeeName: employee ? employee.FullName : 'N/A',  
                clientId: project ? project.FK_WTT_Customer_ID : 'N/A',          
                clientName: customer ? customer.name : 'N/A',     
                projectId: ar.FK_WTT_Project_ID,               
                projectName: project ? project.name : 'N/A',
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                allocPercent: ar.allocPercent+'%',
                allocatedDaysPercent: allocatedDaysPercent+'%',
                resourceCost: allocatedCost
              };
            } else {
              return {
                id: ar.id,
                employeeId: employee ? employee.id : 'N/A',
                employeeCode: employee ? employee.EmployeeCode : 'N/A',
                employeeName: employee ? employee.FullName : 'N/A', 
                clientId: project ? project.FK_WTT_Customer_ID : 'N/A',          
                clientName: customer ? customer.name : 'N/A',
                projectId: ar.FK_WTT_Project_ID,           
                projectName: project ? project.name : 'N/A',
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                allocPercent: ar.allocPercent+'%',                
                allocatedDaysPercent: allocatedDaysPercent+'%',
                resourceCost: 'N/A'
              };
            }
        });  
        return res.json(combinedData);
    }   catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }   
}


module.exports = {
  getAllAllocatedResourceCost,
};