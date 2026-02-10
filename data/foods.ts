
import { FoodItem, Language } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
    // PROTEINS
    {
        id: 'chk-breast',
        name: { [Language.PT]: 'Peito de Frango (Cozido)', [Language.EN]: 'Chicken Breast (Cooked)', [Language.ES]: 'Pechuga de Pollo (Cocida)' },
        calories: 165, protein: 31, carbs: 0, fats: 3.6, category: 'PROTEIN'
    },
    {
        id: 'beef-lean',
        name: { [Language.PT]: 'Patinho Moído (Cozido)', [Language.EN]: 'Ground Beef (Lean)', [Language.ES]: 'Carne Molida (Magra)' },
        calories: 250, protein: 26, carbs: 0, fats: 15, category: 'PROTEIN'
    },
    {
        id: 'egg-whole',
        name: { [Language.PT]: 'Ovo Inteiro', [Language.EN]: 'Whole Egg', [Language.ES]: 'Huevo Entero' },
        calories: 155, protein: 13, carbs: 1.1, fats: 11, category: 'PROTEIN'
    },
    {
        id: 'egg-white',
        name: { [Language.PT]: 'Clara de Ovo', [Language.EN]: 'Egg White', [Language.ES]: 'Clara de Huevo' },
        calories: 52, protein: 11, carbs: 0.7, fats: 0.2, category: 'PROTEIN'
    },
    {
        id: 'whey',
        name: { [Language.PT]: 'Whey Protein (Pó)', [Language.EN]: 'Whey Protein (Powder)', [Language.ES]: 'Whey Protein (Polvo)' },
        calories: 400, protein: 80, carbs: 6, fats: 5, category: 'PROTEIN'
    },
    {
        id: 'tilapia',
        name: { [Language.PT]: 'Tilápia (Grelhada)', [Language.EN]: 'Tilapia (Grilled)', [Language.ES]: 'Tilapia (A la plancha)' },
        calories: 128, protein: 26, carbs: 0, fats: 2.7, category: 'PROTEIN'
    },
    {
        id: 'salmon',
        name: { [Language.PT]: 'Salmão (Grelhado)', [Language.EN]: 'Salmon (Grilled)', [Language.ES]: 'Salmón (A la plancha)' },
        calories: 206, protein: 22, carbs: 0, fats: 12, category: 'PROTEIN'
    },
    {
        id: 'tuna-canned',
        name: { [Language.PT]: 'Atum (Em água)', [Language.EN]: 'Tuna (Canned in water)', [Language.ES]: 'Atún (En agua)' },
        calories: 116, protein: 26, carbs: 0, fats: 0.8, category: 'PROTEIN'
    },
    {
        id: 'cod-fish',
        name: { [Language.PT]: 'Bacalhau (Cozido)', [Language.EN]: 'Cod (Cooked)', [Language.ES]: 'Bacalao (Cocido)' },
        calories: 82, protein: 18, carbs: 0, fats: 0.7, category: 'PROTEIN'
    },
    {
        id: 'shrimp',
        name: { [Language.PT]: 'Camarão (Cozido)', [Language.EN]: 'Shrimp (Cooked)', [Language.ES]: 'Camarones (Cocidos)' },
        calories: 99, protein: 24, carbs: 0.2, fats: 0.3, category: 'PROTEIN'
    },
    {
        id: 'beef-sirloin',
        name: { [Language.PT]: 'Alcatra (Grelhada)', [Language.EN]: 'Sirloin Steak (Grilled)', [Language.ES]: 'Solomillo (A la parrilla)' },
        calories: 200, protein: 28, carbs: 0, fats: 9, category: 'PROTEIN'
    },
    {
        id: 'beef-flank',
        name: { [Language.PT]: 'Fraldinha (Assada)', [Language.EN]: 'Flank Steak (Roast)', [Language.ES]: 'Vacío (Asado)' },
        calories: 195, protein: 27, carbs: 0, fats: 9, category: 'PROTEIN'
    },
    {
        id: 'pork-loin',
        name: { [Language.PT]: 'Lombo Suíno (Assado)', [Language.EN]: 'Pork Loin (Roast)', [Language.ES]: 'Lomo de Cerdo (Asado)' },
        calories: 198, protein: 27, carbs: 0, fats: 9, category: 'PROTEIN'
    },
    {
        id: 'pork-chop',
        name: { [Language.PT]: 'Bisteca Suína (Grelhada)', [Language.EN]: 'Pork Chop (Grilled)', [Language.ES]: 'Chuleta de Cerdo (A la parrilla)' },
        calories: 231, protein: 24, carbs: 0, fats: 14, category: 'PROTEIN'
    },
    {
        id: 'chicken-thigh',
        name: { [Language.PT]: 'Sobrecoxa de Frango (Sem pele)', [Language.EN]: 'Chicken Thigh (Skinless)', [Language.ES]: 'Muslo de Pollo (Sin piel)' },
        calories: 209, protein: 26, carbs: 0, fats: 10.9, category: 'PROTEIN'
    },
    {
        id: 'tofu',
        name: { [Language.PT]: 'Tofu (Firme)', [Language.EN]: 'Tofu (Firm)', [Language.ES]: 'Tofu (Firme)' },
        calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: 'PROTEIN'
    },

    // CARBS
    {
        id: 'rice-white',
        name: { [Language.PT]: 'Arroz Branco (Cozido)', [Language.EN]: 'White Rice (Cooked)', [Language.ES]: 'Arroz Blanco (Cocido)' },
        calories: 130, protein: 2.7, carbs: 28, fats: 0.3, category: 'CARB'
    },
    {
        id: 'rice-brown',
        name: { [Language.PT]: 'Arroz Integral (Cozido)', [Language.EN]: 'Brown Rice (Cooked)', [Language.ES]: 'Arroz Integral (Cocido)' },
        calories: 112, protein: 2.6, carbs: 23, fats: 0.9, category: 'CARB'
    },
    {
        id: 'potato-sweet',
        name: { [Language.PT]: 'Batata Doce (Cozida)', [Language.EN]: 'Sweet Potato (Boiled)', [Language.ES]: 'Batata (Cocida)' },
        calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: 'CARB'
    },
    {
        id: 'potato-english',
        name: { [Language.PT]: 'Batata Inglesa (Cozida)', [Language.EN]: 'White Potato (Boiled)', [Language.ES]: 'Papa (Cocida)' },
        calories: 77, protein: 2, carbs: 17, fats: 0.1, category: 'CARB'
    },
    {
        id: 'oats',
        name: { [Language.PT]: 'Aveia em Flocos', [Language.EN]: 'Oats (Rolled)', [Language.ES]: 'Avena' },
        calories: 389, protein: 16.9, carbs: 66, fats: 6.9, category: 'CARB'
    },
    {
        id: 'banana',
        name: { [Language.PT]: 'Banana Prata', [Language.EN]: 'Banana', [Language.ES]: 'Plátano' },
        calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3, category: 'FRUIT'
    },
    {
        id: 'pasta',
        name: { [Language.PT]: 'Macarrão (Cozido)', [Language.EN]: 'Pasta (Cooked)', [Language.ES]: 'Pasta (Cocida)' },
        calories: 131, protein: 5, carbs: 25, fats: 1.1, category: 'CARB'
    },

    // FATS
    {
        id: 'olive-oil',
        name: { [Language.PT]: 'Azeite de Oliva', [Language.EN]: 'Olive Oil', [Language.ES]: 'Aceite de Oliva' },
        calories: 884, protein: 0, carbs: 0, fats: 100, category: 'FAT'
    },
    {
        id: 'peanut-butter',
        name: { [Language.PT]: 'Pasta de Amendoim', [Language.EN]: 'Peanut Butter', [Language.ES]: 'Mantequilla de Maní' },
        calories: 588, protein: 25, carbs: 20, fats: 50, category: 'FAT'
    },
    {
        id: 'avocado',
        name: { [Language.PT]: 'Abacate', [Language.EN]: 'Avocado', [Language.ES]: 'Aguacate' },
        calories: 160, protein: 2, carbs: 9, fats: 15, category: 'FAT'
    },

    // OTHERS
    {
        id: 'bread-whole',
        name: { [Language.PT]: 'Pão Integral (Fatia)', [Language.EN]: 'Whole Wheat Bread', [Language.ES]: 'Pan Integral' },
        calories: 250, protein: 13, carbs: 41, fats: 3.4, category: 'CARB'
    },
    {
        id: 'apple',
        name: { [Language.PT]: 'Maçã', [Language.EN]: 'Apple', [Language.ES]: 'Manzana' },
        calories: 52, protein: 0.3, carbs: 14, fats: 0.2, category: 'FRUIT'
    },
    // === FRUTAS ===
    {
        id: 'orange',
        name: { [Language.PT]: 'Laranja', [Language.EN]: 'Orange', [Language.ES]: 'Naranja' },
        calories: 47, protein: 0.9, carbs: 12, fats: 0.1, category: 'FRUIT'
    },
    {
        id: 'papaya',
        name: { [Language.PT]: 'Mamão Papaia', [Language.EN]: 'Papaya', [Language.ES]: 'Papaya' },
        calories: 43, protein: 0.5, carbs: 11, fats: 0.3, category: 'FRUIT'
    },
    {
        id: 'strawberry',
        name: { [Language.PT]: 'Morango', [Language.EN]: 'Strawberry', [Language.ES]: 'Fresa' },
        calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, category: 'FRUIT'
    },
    {
        id: 'watermelon',
        name: { [Language.PT]: 'Melancia', [Language.EN]: 'Watermelon', [Language.ES]: 'Sandía' },
        calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2, category: 'FRUIT'
    },
    {
        id: 'grapes',
        name: { [Language.PT]: 'Uvas (Verdes)', [Language.EN]: 'Grapes (Green)', [Language.ES]: 'Uvas (Verdes)' },
        calories: 69, protein: 0.7, carbs: 18, fats: 0.2, category: 'FRUIT'
    },

    // === VEGETAIS & SALADAS ===
    {
        id: 'lettuce',
        name: { [Language.PT]: 'Alface', [Language.EN]: 'Lettuce', [Language.ES]: 'Lechuga' },
        calories: 15, protein: 1.4, carbs: 2.9, fats: 0.2, category: 'CARB'
    },
    {
        id: 'tomato',
        name: { [Language.PT]: 'Tomate', [Language.EN]: 'Tomato', [Language.ES]: 'Tomate' },
        calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: 'FRUIT'
    },
    {
        id: 'cucumber',
        name: { [Language.PT]: 'Pepino', [Language.EN]: 'Cucumber', [Language.ES]: 'Pepino' },
        calories: 16, protein: 0.7, carbs: 3.6, fats: 0.1, category: 'CARB'
    },
    {
        id: 'broccoli',
        name: { [Language.PT]: 'Brócolis (Cozido)', [Language.EN]: 'Broccoli (Boiled)', [Language.ES]: 'Brócoli (Cocido)' },
        calories: 35, protein: 2.4, carbs: 7.2, fats: 0.4, category: 'CARB'
    },
    {
        id: 'carrot',
        name: { [Language.PT]: 'Cenoura (Crua)', [Language.EN]: 'Carrot (Raw)', [Language.ES]: 'Zanahoria (Cruda)' },
        calories: 41, protein: 0.9, carbs: 9.6, fats: 0.2, category: 'CARB'
    },
    {
        id: 'spinach',
        name: { [Language.PT]: 'Espinafre (Refogado)', [Language.EN]: 'Spinach (Sautéed)', [Language.ES]: 'Espinaca (Salteada)' },
        calories: 23, protein: 3, carbs: 3.8, fats: 0.3, category: 'CARB'
    },

    // === CEREAIS & GRÃOS ===
    {
        id: 'corn-flakes',
        name: { [Language.PT]: 'Flocos de Milho (Sem açúcar)', [Language.EN]: 'Corn Flakes (Unsweetened)', [Language.ES]: 'Hojuelas de Maíz' },
        calories: 370, protein: 7, carbs: 84, fats: 0.6, category: 'CARB'
    },
    {
        id: 'granola',
        name: { [Language.PT]: 'Granola Tradicional', [Language.EN]: 'Granola', [Language.ES]: 'Granola' },
        calories: 471, protein: 10, carbs: 64, fats: 20, category: 'CARB'
    },
    {
        id: 'quinoa',
        name: { [Language.PT]: 'Quinoa (Cozida)', [Language.EN]: 'Quinoa (Cooked)', [Language.ES]: 'Quinua (Cocida)' },
        calories: 120, protein: 4.4, carbs: 21, fats: 1.9, category: 'CARB'
    },
    {
        id: 'lentils',
        name: { [Language.PT]: 'Lentilha (Cozida)', [Language.EN]: 'Lentils (Cooked)', [Language.ES]: 'Lentejas (Cocidas)' },
        calories: 116, protein: 9, carbs: 20, fats: 0.4, category: 'PROTEIN'
    },
    {
        id: 'beans-black',
        name: { [Language.PT]: 'Feijão Preto (Cozido)', [Language.EN]: 'Black Beans (Cooked)', [Language.ES]: 'Frijoles Negros (Cocidos)' },
        calories: 132, protein: 8.9, carbs: 23.7, fats: 0.5, category: 'PROTEIN'
    },
    // === LATICÍNIOS ===
    {
        id: 'yogurt-greek',
        name: { [Language.PT]: 'Iogurte Grego Natural', [Language.EN]: 'Greek Yogurt (Plain)', [Language.ES]: 'Yogur Griego (Natural)' },
        calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: 'PROTEIN'
    },
    {
        id: 'milk-skim',
        name: { [Language.PT]: 'Leite Desnatado', [Language.EN]: 'Skim Milk', [Language.ES]: 'Leche Descremada' },
        calories: 34, protein: 3.4, carbs: 5, fats: 0.1, category: 'PROTEIN'
    },
    {
        id: 'cheese-cottage',
        name: { [Language.PT]: 'Queijo Cottage', [Language.EN]: 'Cottage Cheese', [Language.ES]: 'Queso Cottage' },
        calories: 98, protein: 11, carbs: 3.4, fats: 4.3, category: 'PROTEIN'
    }
];

export const getFoodById = (id: string): FoodItem | undefined => {
    return FOOD_DATABASE.find(f => f.id === id);
};

export const searchFoods = (query: string, lang: Language): FoodItem[] => {
    const q = query.toLowerCase();
    return FOOD_DATABASE.filter(f =>
        f.name[lang].toLowerCase().includes(q) ||
        f.name[Language.EN].toLowerCase().includes(q) // Fallback search
    );
};
