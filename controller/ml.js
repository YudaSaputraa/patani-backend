
// import fetch from 'node-fetch';
// const express = require('express');
// const get_predictions = async (inputModel, komoditi) => {
//     const url = `https://patani-ml-5yrauczmnq-et.a.run.app/v1/models/patani-${komoditi}:predict`;
//     const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             instances: inputModel,
//             // [
//             //   [
//             //     [0.72413793],
//             //     [0.86206897],
//             //     [0.86206897],
//             //     [0.86206897],
//             //     [0.86206897],
//             //     [0.86206897],
//             //     [0.86206897],
//             //     [0.86206897],
//             //   ],
//             // ],
//         }),
//     });
//     const respJson = await response.json();
//     return respJson["predictions"];
//     // console.log(respJson.predictions[0][0]);
// };

// // get_forecast();
// let komoditi = 'bayam';
// const LAST_DATE_IN_DATA = "2023-11-24";
// let newKomoditi = komoditi.toUpperCase();
// let init_value_forecasts;
// let min_series;// Ganti dengan nilai yang sesuai
// let max_series;
// if (newKomoditi === 'BAYAM') {
//     init_value_forecasts = [
//         [[12000], [14000], [14000], [14000], [14000], [14000], [14000], [14000]],
//     ];
//     min_series = 1500; // Ganti dengan nilai yang sesuai
//     max_series = 14500;
// } // Ganti dengan nilai yang sesuai
// const norm_init_value_forecasts = [
//     init_value_forecasts[0].map((val) => [(val[0] - min_series) / max_series]),
// ];

// const get_forecast = async (start_date_target, end_date_target, komoditi) => {
//     const last_date = new Date(LAST_DATE_IN_DATA);
//     const start_date = new Date(start_date_target);
//     const end_date = new Date(end_date_target);

//     const number_week_start = Math.floor(
//         (start_date - last_date) / (7 * 24 * 3600 * 1000)
//     ); // per week
//     const number_week_end = Math.floor(
//         (end_date - last_date) / (7 * 24 * 3600 * 1000)
//     ); // per week

//     const dict_of_forecasts = {};
//     let init_value_forecasts = norm_init_value_forecasts;

//     let result_forecast;
//     for (let num_week = 0; num_week <= number_week_end; num_week++) {
//         // start with 0 (current week)
//         if (num_week === 0) {
//             // Still using last data (since same week - 28/7/2023)
//             result_forecast = init_value_forecasts[init_value_forecasts.length - 1];
//         } else {

//             result_forecast = await get_predictions(init_value_forecasts, komoditi);
//             result_forecast = result_forecast[0][result_forecast.length - 1][0];
//             init_value_forecasts[0].shift();
//             let temp_init_value_forecast = init_value_forecasts;
//             temp_init_value_forecast[0].push([result_forecast]);
//             init_value_forecasts = temp_init_value_forecast;
//             console.log("🔥 input", init_value_forecasts);
//         }

//         if (number_week_start <= num_week && num_week <= number_week_end) {
//             const init_date_in_seconds =
//                 last_date.getTime() + num_week * (7 * 24 * 3600 * 1000);
//             for (let num_day = 0; num_day < 7; num_day++) {
//                 const target_date_in_seconds =
//                     init_date_in_seconds + num_day * (24 * 3600 * 1000);
//                 if (
//                     start_date.getTime() <= target_date_in_seconds &&
//                     target_date_in_seconds <= end_date.getTime()
//                 ) {
//                     dict_of_forecasts[new Date(target_date_in_seconds).toISOString()] =
//                         result_forecast * max_series - min_series;
//                 }
//             }
//         }
//     }

//     return dict_of_forecasts;
// };

// const inputPrediction = async (req, res) => {
//     try {
//         const { startDate, endDate, komoditi } = req.body;
//         get_forecast(startDate, endDate, komoditi).then((result) =>
//             res.status(200).json({
//                 status: "success",
//                 message: "successfully input prediction",
//                 result
//             })
//         );
//     } catch (error) {

//     }
// }

// module.exports = {
//     inputPrediction,
// }


