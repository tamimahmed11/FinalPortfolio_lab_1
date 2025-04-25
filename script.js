document.addEventListener('DOMContentLoaded', function() {
    // Problem selector functionality
    const problemSelect = document.getElementById('problem-select');
    const problemDescription = document.getElementById('problem-description');
    
    const problemDescriptions = {
      twosum: {
        title: "Two Sum Problem",
        description: "Given an array of integers and a target value, find two numbers such that they add up to the target.",
        example: "Input: [2,7,11,15], Target: 9 → Output: [0,1]"
      },
      fibonacci: {
        title: "Fibonacci Sequence",
        description: "Given a number n, print the nth Fibonacci number. The Fibonacci sequence is a series where the next number is the sum of the previous two.",
        example: "Input: 6 → Output: 8 (Sequence: 0, 1, 1, 2, 3, 5, 8)"
      },
      binarysearch: {
        title: "Binary Search",
        description: "Given a sorted array of integers and a target value, return the index of the target if found. If not found, return -1.",
        example: "Input: [1,3,5,7,9], Target: 5 → Output: 2"
      }
    };
    
    problemSelect.addEventListener('change', function() {
      const selectedProblem = problemSelect.value;
      const problem = problemDescriptions[selectedProblem];
      
      problemDescription.innerHTML = `
        <h5>${problem.title}</h5>
        <p>${problem.description}</p>
        <p><strong>Example:</strong> ${problem.example}</p>
      `;
      
      // Clear previous results
      document.getElementById('output-result').innerHTML = '';
    });
    
    // Problem solver functionality
    document.getElementById('solve-btn').addEventListener('click', function() {
      const problemType = problemSelect.value;
      const outputResult = document.getElementById('output-result');
      outputResult.innerHTML = '';
      
      try {
        let result;
        const inputArray = document.getElementById('input-array').value;
        const target = document.getElementById('input-target').value;
        
        if (!inputArray) {
          throw new Error('Please enter an input array');
        }
        
        const nums = inputArray.split(',').map(num => parseInt(num.trim()));
        
        if (nums.some(isNaN)) {
          throw new Error('Please enter valid numbers separated by commas');
        }
        
        switch(problemType) {
          case 'twosum':
            if (!target) throw new Error('Please enter a target value');
            result = twoSum(nums, parseInt(target));
            outputResult.innerHTML = `<p>Indices of the two numbers: <strong>[${result.join(', ')}]</strong></p>`;
            break;
            
          case 'fibonacci':
            if (nums.length !== 1) throw new Error('Please enter a single number for Fibonacci');
            result = fibonacci(nums[0]);
            outputResult.innerHTML = `<p>The ${nums[0]}${getOrdinalSuffix(nums[0])} Fibonacci number is: <strong>${result}</strong></p>`;
            break;
            
          case 'binarysearch':
            if (!target) throw new Error('Please enter a target value');
            result = binarySearch(nums, parseInt(target));
            outputResult.innerHTML = result === -1 
              ? `<p>Target <strong>${target}</strong> not found in the array</p>`
              : `<p>Target <strong>${target}</strong> found at index: <strong>${result}</strong></p>`;
            break;
        }
        
        // Add animation
        document.getElementById('solution-output').classList.add('fade-in');
        
      } catch (error) {
        outputResult.innerHTML = `<p class="text-danger">${error.message}</p>`;
      }
    });
    
    // Algorithm implementations
    function twoSum(nums, target) {
      const numMap = {};
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.hasOwnProperty(complement)) {
          return [numMap[complement], i];
        }
        numMap[nums[i]] = i;
      }
      throw new Error('No two sum solution found');
    }
    
    function fibonacci(n, memo = {}) {
      if (n in memo) return memo[n];
      if (n <= 1) return n;
      memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
      return memo[n];
    }
    
    function binarySearch(nums, target) {
      let left = 0;
      let right = nums.length - 1;
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
      }
      
      return -1;
    }
    
    function getOrdinalSuffix(num) {
      const j = num % 10;
      const k = num % 100;
      if (j === 1 && k !== 11) return 'st';
      if (j === 2 && k !== 12) return 'nd';
      if (j === 3 && k !== 13) return 'rd';
      return 'th';
    }
    
    // Initialize with first problem description
    const initialProblem = problemDescriptions[problemSelect.value];
    problemDescription.innerHTML = `
      <h5>${initialProblem.title}</h5>
      <p>${initialProblem.description}</p>
      <p><strong>Example:</strong> ${initialProblem.example}</p>
    `;
  });