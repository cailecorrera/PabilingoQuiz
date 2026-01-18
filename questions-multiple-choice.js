/*
    Multiple Choice Questions
*/

const multipleChoiceQuestions = {
    // Chapter 0: Addition and Subtraction
    0: {
        0: [
            { question: "2409 + 0310 = ?", options: ["-2679", "2679", "2719", "-2719"], answer: "2719" },
            { question: "2339049 + 720 = ?", options: ["-2339769", "2339769", "-2393769", "2393769"], answer: "2339769" },
            { question: "91 + 230 + 93 + 193 + 239 = ?", options: ["846", "864", "884", "886"], answer: "846" },
		 
	  ],
        1: [
            { question: "59 - 348 = ?", options: ["289", "-289", "298", "-298"], answer: "-289" },
            { question: "43 - 54 - 81 = ?", options: ["29", "92", "-29", "-92"], answer: "-92" },
            { question: "1700000 - 60000 - 4320 = ?", options: ["1636580", "-1636580", "1635680", "-1635680"], answer: "1635680" },
            
        ],
        2: [
            { question: "463 + 89 - 210 = ?", options: ["324", "-324", "342", "-342"], answer: "342" },
		 { question: "283 - 2937 + 92 = ?", options: ["-2562", "2562", "-2652", "2652"], answer: "-2562" },
		 { question: "45 + 45 - 45 + 45 - 45 - 45 = ?", options: ["90", "0", "45", "-45"], answer: "0" },
		 { question: "82 + 82 - 34 - 34 = ?", options: ["82", "34", "96", "-96"], answer: "-96" },

        ]
    },
    // Chapter 1: Multiplication and Division
    1: {
        0: [
            { question: "15 x 34 = ?", options: ["510", "511", "512", "513"], answer: "510" },
            { question: "78 x 22 = ?", options: ["-1761", "1761", "-1716", "1716"], answer: "1716" },
		 { question: "44 x 92 = ?", options: ["4008", "-4008", "4048", "-4048"], answer: "4048" },

        ],
        1: [
            { question: "12 ÷ 4 = ?", options: ["2", "3", "4", "5"], answer: "3" },
            { question: "432 ÷ 18 = ?", options: ["22", "24", "26", "28"], answer: "24" },
            { question: "810 ÷ 18 = ?", options: ["44", "45", "46", "47"], answer: "45" },
            
        ],
        2: [
            { question: "4 × 3 ÷ 2?", options: ["4", "5", "7", "6"], answer: "6" },
            { question: "20 ÷ 4 × 2?", options: ["8", "9", "10", "11"], answer: "10" },
            { question: "15 × 8 ÷ 5 = ?", options: ["24", "23", "22", "25"], answer: "24" },
            { question: "10 × 12 ÷ 4 = ?", options: ["28", "30", "29", "31"], answer: "30" },
            
        ]
    },
    // Chapter 2: Mixed Basic Operations
    2: {
        0: [
            { question: "3 + 2 × 4?", options: ["11", "14", "20", "9"], answer: "11" },
            { question: "12 ÷ 4 + 9 = ?", options: ["10", "11", "12", "13"], answer: "12" },
            { question: "36 × 4 + 19 = ?", options: ["155", "122", "145", "163"], answer: "163" },
        ],
        1: [
            { question: "2 + 3 × 4 - 5?", options: ["7", "9", "11", "15"], answer: "9" },
            { question: "20 ÷ 4 + 3 - 2?", options: ["4", "5", "6", "7"], answer: "6" },
            { question: "50 ÷ 2 - 12 + 9?", options: ["30", "31", "32", "33"], answer: "30" },
            
        ],
        2: [
            { question: "10 + 4 × 2 - 6 ÷ 3?", options: ["14", "16", "18", "20"], answer: "16" },
            { question: "15 ÷ 3 + 2 × 4 - 1?", options: ["10", "12", "14", "16"], answer: "12" },
            { question: "81 ÷ 9 + 7 × 6 - 5?", options: ["56", "57", "58", "59"], answer: "57" },
            { question: "7 + 60 ÷ 5 × 2 - 6?", options: ["25", "26", "27", "28"], answer: "25" },
        ]
    },
    // Chapter 3: Fundamental Notation
    3: {
        0: [
            { question: "3x + 10 = 19?", options: ["x = 3", "x = -3", "x = 13", "x = -13"], answer: "x = 3" },
            { question: "12x + 9 = 93?", options: ["x = -7", "x = 7", "x = 84", "x = -84"], answer: "x = 7" },
            { question: "6x - 9 = 33?", options: ["x = -42", "x = -7", "x = 42", "x = 7"], answer: "x = 7" },
                       
            
                   ],
        1: [
            { question: "2x - 8 = 3x + 9", options: ["x = 17", "x = -17", "x = 20", "x = -20"], answer: "x = -17" },
            { question: "6x + 12 = 3x + 30", options: ["x = 6", "x = -6", "x = 8", "x = -8"], answer: "x = 6" },
            { question: "7x - 14 = 4x + 20", options: ["x = -12", "x = 10", "x = 12", "x = -10"], answer: "x = 12" },
            
                    ],
        2: [
            { question: "x^2 - 5x + 6 = 0", options: ["x = 2 at x = 3", "x = -2 at x = 3", "x = 2 at x = -3", "x = -2 at x = -3"], answer: "x = 2 at x = 3" },
            { question: "x^2 + 5x - 14 = 0", options: ["x = 2 at x = 7", "x = -2 at x = 7", "x = 2 at x = -7", "x = -2 at x = -7"], answer: "x = 2 at x = -7" },
            { question: "x^2 - 6x + 8 = 0", options: ["x = 2 at x = 4", "x = -2 at x = 4", "x = 2 at x = -4", "x = -2 at x = -4"], answer: "x = 2 at x = 4" },
            { question: "x^2 - 4 - 5x = 0", options: ["x = -1 at x = 5", "x = 1 at x = -5", "x = 1 at x = 5", "x = -1 at x = -5"], answer: "x = 1 at x = -5" },
            { question: "x^2 + 9x - 22 = 0", options: ["x = 2 at x = -11", "x = -2 at x = 11", "x = 2 at x = 11", "x = -2 at x = -11"], answer: "x = 2 at x = -11" },
        ]
    },
    // Chapter 4: Equivalent Expressions
    4: {
      
	0: [
           { question: "Payakin ang mga sumusunod na panandaing pahayag sa pamamagitan ng pagsasama ng mga magkatulad na takay: 4x² - 3xy + 5y² - 2x + 7 + 2x² + 6xy - y² + 4x - 3", options: ["6x² + 3xy + 4y² + 2x + 4", "6x² + 3xy + 4y² - 2x + 6", "-6x² + 3xy + 4y² + 2x + 6", "-6x² - 3xy + 4y² - 2x + 4"], answer: "6x² + 3xy + 4y² + 2x + 4" },
		 { question: "Magsagawa ng pagbabawas sa dalawang damikay na ito: (5a²b - 4ab² + 3a - 8) - (2a²b + 3ab² - 5a + 2)", options: ["3a²b + 7ab² - 4a + 15", "3a²b - 7ab² + 8a - 10", "-3a²b + 7ab² - 8a - 10", "-3a²b + 7ab² - 4a + 15"], answer: "3a²b - 7ab² + 8a - 10" },
           { question: "Payakin ang sumusunod sa pamamagitan ng pagsasama ng mga magkatulad na takay: 7m² - 2mn + n² + 5m - 4 + 3m² + 6mn - 3n² - 2m + 1", options: [ "10m² + 4mn - 2n² + 3m - 3", "10m² - 4mn - 2n² + 3m - 3", "4m² + 4mn - 2n² + 3m - 3","10m² + 4mn + 2n² + 3m - 3" ], answer: "10m² + 4mn - 2n² + 3m - 3"},
           { question: "Magsagawa ng pagbabawas sa dalawang damikay na ito: (6a² - 3ab + 4b² + 7) - (2a² + 5ab - b² - 3)", options: ["4a² - 8ab + 5b² + 10", "4a² + 8ab + 3b² + 4","4a² - 8ab + 3b² + 10","-4a² - 8ab + 5b² + 10"],answer: "4a² - 8ab + 5b² + 10"},        
            { question: "Bungkagin ang sumusunod na pánandaing pahayag sa pamamagitan ng kaibhán ng dalawáng parirami: 49z⁴ - 64w²", options: ["(7z² + 4w)(7z² - 4w)", "(7z² + 8w)(7z² - 8w)", "-(7z² + 8w)(7z² - 8w)", "-(7z² + 4w)(7z² - 4w)"], answer: "(7z² + 8w)(7z² - 8w)" },
        ],
        1: [
            { question: "Ano ang pinakamalaking lahatang isakay sa nakasulat na pánandaing pahayag: 12x³y² - 18x²y³ + 24xy⁴", options: ["6xy²", "6x²y", "6xy", "-6yx"], answer: "6xy²" },
           {question: "Payakin ang mga sumusunod na panandaing pahayag sa pamamagitan ng pagsasama ng mga magkatulad na takay: 4x³ - 3x²y + 5y³ - 2x + 7 + 2x³ + 6x²y - y³ + 4x - 3", options: ["6x³ + 3x²y + 4y³ + 2x + 4","6x³ - 3x²y + 4y³ + 2x + 4","-6x³ + 3x²y + 4y³ + 2x + 4","6x³ + 3x²y - 4y³ + 2x + 4"],answer: "6x³ + 3x²y + 4y³ + 2x + 4"},       
  		{ question: "Magsagawa ng pagbabawas sa dalawang damikay na ito: (5a³ - 4a²b + 3ab² - 8) - (2a³ + 3a²b - 5ab² + 2)",options: ["3a³ - 7a²b + 8ab² - 10","3a³ + 7a²b - 2ab² - 10","-3a³ - 7a²b + 8ab² - 10","3a³ - 7a²b - 8ab² + 10"],answer: "3a³ - 7a²b + 8ab² - 10"},
  		{ question: "Bungkagin ang sumusunod na pánandaing pahayag sa pamamagitan ng dagup ng dalawáng talurami: 27x³ + 125y³", options: ["(3x + 5y)(9x² - 15xy + 25y²)", "(3x + 5y)(9x² + 25xy + 15y²)", "-(3x + 5y)(9x² - 15xy + 25y²)", "-(3x + 5y)(9x² + 25xy + 15y²)"], answer: "(3x + 5y)(9x² - 15xy + 25y²)" },
  		{question: "Payakin ang sumusunod sa pamamagitan ng pagsasama ng mga magkatulad na takay: 6m³ - 2m²n + n³ + 5m - 4 + 4m³ + 5m²n - 3n³ - 2m + 1", options: ["10m³ + 3m²n - 2n³ + 3m - 3","10m³ - 3m²n - 2n³ + 3m - 3", "2m³ + 3m²n - 2n³ + 3m - 3","10m³ + 3m²n + 2n³ + 3m - 3"],answer: "10m³ + 3m²n - 2n³ + 3m - 3"},
        ],
        2: [
           { question: "Ano ang pinakamalaking lahatang isakay sa pánandaing pahayag: 8x²y³ - 12x³y² + 4x²y²", options: ["4x²y²", "4xy²", "2x²y", "4xy"], answer: "4x²y²" },
		{ question: "Payakin ang mga sumusunod sa pamamagitan ng pagsasama ng mga magkatulad na takay: 3a² + 5a³ - 4a + 7 + 2a² - 3a³ + a - 5", options: ["5a² - 3a + 2", "5a² + 3a + 2", "a² - 3a + 2", "a² + 3a + 2"], answer: "5a² - 3a + 2" },
		{ question: "Magsagawa ng pagbabawas sa dalawang damikay: (6x³ - 2x² + 5x - 9) - (4x³ + x² - 3x + 1)", options: ["2x³ - 3x² + 8x - 10", "10x³ - x² + 2x - 10", "2x³ + 3x² + 8x - 10", "-2x³ - 3x² + 8x - 10"], answer: "2x³ - 3x² + 8x - 10" },
		{ question: "Bungkagin ang sumusunod na pánandaing pahayag: x³ - 9x", options: ["x(x + 3)(x - 3)", "(x - 3)(x - 3)", "x(x² - 9)", "-x(x + 3)(x - 3)"], answer: "x(x + 3)(x - 3)" },
		{ question: "Payakin ang sumusunod sa pamamagitan ng pagsasam ng mga magkatulad na takay: 4y² + 6y³ - 2y + 1 - 3y³ + y² + 5y - 4", options: ["3y³ + 5y² + 3y - 3", "3y³ + 5y² - 3y - 3", "y³ + 5y² + 3y - 3", "3y³ + y² + 3y - 3"], answer: "3y³ + 5y² + 3y - 3" },
        ]
    }
};