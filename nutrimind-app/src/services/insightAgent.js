/**
 * Insight Agent
 * Responsibility: Generates prompts and handles AI/mock function calls.
 */

export const analyzeFood = async (input, quantity) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const text = input.toLowerCase();
  
  // Basic multiplier logic
  let multiplier = 1;
  if (quantity?.includes('2') || quantity?.includes('200g')) multiplier = 2;
  if (quantity?.includes('1/2')) multiplier = 0.5;

  // Default Baseline (Moderate)
  let result = {
    calories: 450,
    rating: "Moderate",
    macros: { protein: 35, carbs: 45, fats: 20 },
    issues: ["Could be more optimized"],
    smartSwap: null,
    reasoning: "A balanced profile, but could benefit from a higher protein-to-carb ratio for better metabolic efficiency."
  };
  
  // Keyword Overrides
  if (text.includes('salad') || text.includes('apple') || text.includes('broccoli')) {
    result = {
      calories: 150,
      rating: "Good",
      macros: { protein: 20, carbs: 70, fats: 10 },
      issues: [],
      smartSwap: "Excellent choice. Swap creamy dressing for lemon & tahini.",
      reasoning: "High micronutrient density and low caloric load contribute to a Good rating. Great for glucose stability."
    };
  } else if (text.includes('burger') || text.includes('pizza') || text.includes('fries') || text.includes('rice')) {
    const isRice = text.includes('rice');
    result = {
      calories: isRice ? 400 : 750,
      rating: "Poor",
      macros: { protein: 20, carbs: 55, fats: 25 },
      issues: ["High glycemic index", "High sodium content"],
      smartSwap: isRice ? "Switch to Brown Rice or Quinoa for 3x more fiber." : "Try an open-faced version or lettuce wrap to halve the refined carbs.",
      reasoning: isRice ? "High carbohydrate density and processed grains lead to a lower rating." : "High saturated fats and caloric density exceed recommended single-meal thresholds."
    };
  }

  // Apply Quantity Multiplier
  result.calories = Math.round(result.calories * multiplier);
  // Macros are usually expressed as percentages or ratios in these charts, but we'll scale them slightly for 'weight' if needed.
  // We'll keep them as percentages for the summary.

  // Dynamic Suggestion Logic
  const dynamicSuggestions = [];
  
  if (result.calories > 600) {
    dynamicSuggestions.push("Reduce portion size by approx 20% to manage total caloric density.");
  }
  if (result.macros.protein < 30) {
    dynamicSuggestions.push("Add 100g of lean protein (chicken/tofu/egg whites) to improve satiety.");
  }
  if (result.macros.carbs > 55) {
    dynamicSuggestions.push("Swap 1/2 of refined carbohydrates with leafy greens to lower the glycemic load.");
  }

  // Finalize suggestions (2-3 items)
  result.suggestions = dynamicSuggestions.slice(0, 3);
  if (result.suggestions.length < 2) {
    if (result.rating === 'Good') {
      result.suggestions.push("Excellent biometric balance! Maintain this nutrient density mapping.");
    }
    result.suggestions.push("Hydration: Consume 500ml water after this meal for optimal metabolism.");
  }

  return result;
};

/**
 * @deprecated Use analyzeFood instead
 */
export const fetchInsights = async (foodDetails) => {
  return analyzeFood(foodDetails);
};
