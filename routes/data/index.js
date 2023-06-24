const express = require("express")
const router = express.Router() 
const DataModel=require('../../models/data') 


 

router.post('/total_items', async (req, res) => { 
     
    try{
        const startDate= req.body.start_date;
        const endDate=req.body.end_date;
        const userDepartment=req.body.department;
        const totalItems= await  DataModel.count({
             date:{$gte:startDate,$lte:endDate},
             department:userDepartment 
        })   
        res.send({itemsCount:totalItems,status:'200',message:'success'});
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something went wrong.'});

   }
})

 
 
router.post('/nth_most_total_item', async (req, res) => { 
     
    try{
        const { item_by, start_date, end_date, n } = req.body;

        let sortBy;
        if (item_by === 'quantity') {
        sortBy = { quantity: -1 };
        } else if (item_by === 'price') {
        sortBy = { total_price: -1 };
        } else {
        return res.status(400).json({ error: 'Invalid item_by value. Must be "quantity" or "price".' });
        }
        const result= await DataModel.aggregate([
            {
              $match: {
                date: {
                  $gte: new Date(start_date),
                  $lte: new Date(end_date),
                },
              },
            },
            {
              $group: {
                _id: '$software',
                quantity: { $sum: '$seats' },
                total_price: { $sum: { $multiply: ['$seats', '$amount'] } },
              },
            },
            {
              $sort: sortBy,
            },
            {
              $skip: n - 1,
            },
            {
              $limit: 1,
            },
            {
              $project: {
                _id: 0,
                name: '$_id',
              },
            },
          ]);

          if (result.length === 0) {
            return res.status(404).json({ error: 'No items found for the given criteria.' });
          }

          const itemName = result[0].name;
         res.send( { item:itemName,status:'200',message:'Success'} );
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something went wrong.'});

   }
})
 

 

router.post('/percentage_of_department_wise_sold_items',  async (req, res) => { 
     
    try{
        const startDate= req.body.start_date;
        const endDate=req.body.end_date;
         const result= await  DataModel.aggregate([
            {
              $match: {
                date: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
                },
              },
            },
            {
              $group: {
                _id: '$department',
                count: { $sum: 1 },
              },
            },
          ]);

          const totalItems = result.reduce((total, department) => total + department.count, 0);
            const departmentPercentages = {};
            result.forEach((department) => {
            const percentage = (department.count / totalItems) * 100;
            departmentPercentages[department._id] = `${percentage.toFixed(2)}%`;
            });


        res.send( {depWisePercentage:departmentPercentages,status:'200',message:'Success'} );
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something went wrong'});

   }
})


 

router.post('/monthly_sales',  async (req, res) => { 
     
    try{
        // delete a blog with the given id
        const product= req.body.product;
        const year=req.body.year;
         const result= await DataModel.aggregate(
            [
                {
                  $match: {
                    software: product,
                    date: {
                      $gte: new Date(`${year-1}-12-31`),
                      $lte: new Date(`${year+1}-01-01`),
                    },
                  },
                },
                {
                  $group: {
                    _id: { $month: '$date' },
                    totalSales: { $sum: '$amount' },
                  },
                },
                {
                  $sort: {
                    _id: 1,
                  },
                },
                
              ]
         );
         const salesData = {};
         for(let i=0;i<12;++i){
            salesData[`Month${i+1}`] = 0;
         }
         result.forEach((data) => {
           const month = data._id;
           const sales = data.totalSales;
           salesData[`Month${month}`] = sales;
         });
            res.send( {sales:salesData,status:'200',message:'Success'} );
        
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something went wrong'});

   }
})




module.exports = router