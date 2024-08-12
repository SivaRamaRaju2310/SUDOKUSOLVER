// Function to check if placing a number is valid
function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Backtracking function to solve the Sudoku
function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {  // Empty cell
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;  // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to validate input to ensure only single-digit numbers
function validateInput(input) {
    const value = input.value;
    if (!/^[1-9]$/.test(value)) {
        input.value = '';
    }
}

// Function to solve the Sudoku puzzle based on user input
function solveSudoku() {
    const grid = Array.from({ length: 9 }, (_, i) => 
        Array.from({ length: 9 }, (_, j) => {
            const cell = document.getElementById(`cell-${i}-${j}`);
            return cell.value ? parseInt(cell.value) : 0;
        })
    );

    if (solve(grid)) {
        grid.forEach((row, i) => row.forEach((num, j) => {
            document.getElementById(`cell-${i}-${j}`).value = num;
        }));
        console.log("Sudoku solved successfully!");
    } else {
        alert("No solution exists.");
    }
}

// Function to reset the Sudoku grid
function resetGrid() {
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
}
