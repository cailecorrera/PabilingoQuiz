/*
    MathQuest - Questions Combiner
    Combines all question types into one structure
*/

// Build the questions object from separate files
const questions = {};

// Initialize structure for all chapters and levels
for (let chapter = 0; chapter < 5; chapter++) {
    questions[chapter] = {};
    for (let level = 0; level < 3; level++) {
        questions[chapter][level] = [];
        
        // Add multiple choice questions
        if (multipleChoiceQuestions[chapter] && multipleChoiceQuestions[chapter][level]) {
            multipleChoiceQuestions[chapter][level].forEach(q => {
                questions[chapter][level].push({
                    type: "multiple-choice",
                    ...q
                });
            });
        }
        
        // Add fill-blank questions
        if (fillBlankQuestions[chapter] && fillBlankQuestions[chapter][level]) {
            fillBlankQuestions[chapter][level].forEach(q => {
                questions[chapter][level].push({
                    type: "fill-blank",
                    ...q
                });
            });
        }
        
        // Add identification questions
        if (identificationQuestions[chapter] && identificationQuestions[chapter][level]) {
            identificationQuestions[chapter][level].forEach(q => {
                questions[chapter][level].push({
                    type: "identification",
                    ...q
                });
            });
        }
        
        // Add matching questions
        if (matchingQuestions[chapter] && matchingQuestions[chapter][level]) {
            matchingQuestions[chapter][level].forEach(q => {
                questions[chapter][level].push({
                    type: "matching",
                    ...q
                });
            });
        }
    }
}
