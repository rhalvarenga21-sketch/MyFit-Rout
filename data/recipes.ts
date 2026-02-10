
import { Language, MealType } from '../types';

export type RecipeCategory = 'SUMMER' | 'WINTER'; // Cold vs Hot

export interface Recipe {
    id: string;
    title: Record<Language, string>;
    category: RecipeCategory;
    mealTypes: MealType[]; // Can be suitable for multiple (e.g. Lunch & Dinner)
    calories: number; // Total per serving
    protein: number;
    carbs: number;
    fats: number;
    timeMinutes: number;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    icon: string; // Emoji for now
    color: string; // Tailwind color class
    ingredients: Record<Language, string[]>;
    instructions: Record<Language, string[]>;
}

export const RECIPE_DATABASE: Recipe[] = [
    // === REFEIÇÕES PRINCIPAIS (ALMOÇO/JANTAR) ===
    {
        id: 'rec_frango_grelhado_legumes',
        title: { [Language.PT]: 'Frango Grelhado com Legumes', [Language.EN]: 'Grilled Chicken with Veggies', [Language.ES]: 'Pollo a la Parrilla con Verduras' },
        category: 'SUMMER',
        mealTypes: ['LUNCH', 'DINNER', 'POST_WORKOUT'],
        calories: 350, protein: 45, carbs: 15, fats: 10,
        timeMinutes: 20, difficulty: 'EASY', icon: '🍗', color: 'from-orange-400 to-orange-600',
        ingredients: {
            [Language.PT]: ['200g Peito de frango', '1 Abobrinha', '1 Cenoura', 'Sal e pimenta a gosto', '1 fio de azeite'],
            [Language.EN]: ['200g Chicken breast', '1 Zucchini', '1 Carrot', 'Salt and pepper', 'Olive oil'],
            [Language.ES]: ['200g Pechuga de pollo', '1 Calabacín', '1 Zanahoria', 'Sal y pimienta', 'Aceite de oliva']
        },
        instructions: {
            [Language.PT]: ['Tempere o frango.', 'Grelhe o frango em fogo médio.', 'Em outra frigideira, salteie os legumes cortados.', 'Sirva juntos.'],
            [Language.EN]: ['Season the chicken.', 'Grill chicken over medium heat.', 'Sauté chopped veggies in another pan.', 'Serve together.'],
            [Language.ES]: ['Sazona el pollo.', 'Asa el pollo a fuego medio.', 'Saltea las verduras cortadas en otra sartén.', 'Sirve juntos.']
        }
    },
    {
        id: 'rec_sopa_abobora',
        title: { [Language.PT]: 'Sopa Creme de Abóbora', [Language.EN]: 'Pumpkin Cream Soup', [Language.ES]: 'Crema de Calabaza' },
        category: 'WINTER',
        mealTypes: ['DINNER', 'LUNCH'],
        calories: 220, protein: 5, carbs: 35, fats: 8,
        timeMinutes: 30, difficulty: 'MEDIUM', icon: '🥣', color: 'from-amber-500 to-orange-500',
        ingredients: {
            [Language.PT]: ['300g Abóbora Cabotiá', '1/2 Cebola', '1 dente de alho', '50ml Leite de coco light', 'Gengibre a gosto'],
            [Language.EN]: ['300g Pumpkin', '1/2 Onion', '1 Garlic clove', '50ml Light coconut milk', 'Ginger to taste'],
            [Language.ES]: ['300g Calabaza', '1/2 Cebolla', '1 diente de ajo', '50ml Leche de coco ligera', 'Jengibre al gusto']
        },
        instructions: {
            [Language.PT]: ['Cozinhe a abóbora até ficar macia.', 'Refogue cebola e alho.', 'Bata tudo no liquidificador com o leite de coco.', 'Aqueça e sirva.'],
            [Language.EN]: ['Boil pumpkin until soft.', 'Sauté onion and garlic.', 'Blend everything with coconut milk.', 'Heat and serve.'],
            [Language.ES]: ['Hierve la calabaza hasta que esté suave.', 'Saltea cebolla y ajo.', 'Licúa todo con la leche de coco.', 'Calienta y sirve.']
        }
    },
    {
        id: 'rec_escondidinho_batata_doce',
        title: { [Language.PT]: 'Escondidinho de Batata Doce', [Language.EN]: 'Sweet Potato Shepherd\'s Pie', [Language.ES]: 'Pastel de Batata Dulce' },
        category: 'WINTER',
        mealTypes: ['LUNCH', 'DINNER', 'POST_WORKOUT'],
        calories: 420, protein: 35, carbs: 50, fats: 12,
        timeMinutes: 45, difficulty: 'MEDIUM', icon: '🍠', color: 'from-purple-500 to-pink-500',
        ingredients: {
            [Language.PT]: ['200g Batata doce cozida e amassada', '150g Carne moída magra (patinho)', 'Cebola e alho', 'Queijo cottage (opcional)'],
            [Language.EN]: ['200g Mashed sweet potato', '150g Lean ground beef', 'Onion and garlic', 'Cottage cheese (optional)'],
            [Language.ES]: ['200g Batata dulce hecha puré', '150g Carne molida magra', 'Cebolla y ajo', 'Queso cottage (opcional)']
        },
        instructions: {
            [Language.PT]: ['Refogue a carne moída temperada.', 'Faça um purê com a batata doce.', 'Monte em camadas: carne, purê.', 'Gratine no forno por 15min.'],
            [Language.EN]: ['Cook seasoned ground beef.', 'Mash the sweet potatoes.', 'Layer beef then potato.', 'Bake for 15min.'],
            [Language.ES]: ['Cocina la carne molida sazonada.', 'Haz un puré con la batata.', 'Coloca capas: carne, puré.', 'Hornea por 15min.']
        }
    },

    // === CAFÉ DA MANHÃ / LANCHES (VERÃO) ===
    {
        id: 'rec_overnight_oats',
        title: { [Language.PT]: 'Overnight Oats de Frutas Vermelhas', [Language.EN]: 'Berry Overnight Oats', [Language.ES]: 'Avena Nocturna con Frutos Rojos' },
        category: 'SUMMER',
        mealTypes: ['BREAKFAST', 'SNACK'],
        calories: 320, protein: 15, carbs: 45, fats: 8,
        timeMinutes: 5, difficulty: 'EASY', icon: '🍓', color: 'from-red-400 to-pink-500',
        ingredients: {
            [Language.PT]: ['40g Aveia em focos', '100g Iogurte grego', '50ml Leite desnatado', 'Frutas vermelhas', 'Adoçante a gosto'],
            [Language.EN]: ['40g Rolled oats', '100g Greek yogurt', '50ml Skim milk', 'Berries', 'Sweetener to taste'],
            [Language.ES]: ['40g Avena en hojuelas', '100g Yogur griego', '50ml Leche descremada', 'Frutos rojos', 'Edulcorante al gusto']
        },
        instructions: {
            [Language.PT]: ['Misture aveia, iogurte e leite em um pote.', 'Adicione as frutas por cima.', 'Deixe na geladeira durante a noite.', 'Coma frio.'],
            [Language.EN]: ['Mix oats, yogurt and milk in a jar.', 'Add berries on top.', 'Refrigerate overnight.', 'Eat cold.'],
            [Language.ES]: ['Mezcla avena, yogur y leche en un frasco.', 'Añade los frutos rojos encima.', 'Refrigera toda la noche.', 'Come frío.']
        }
    },
    {
        id: 'rec_shake_tropical',
        title: { [Language.PT]: 'Shake Tropical Proteico', [Language.EN]: 'Tropical Protein Shake', [Language.ES]: 'Batido Tropical Proteico' },
        category: 'SUMMER',
        mealTypes: ['BREAKFAST', 'SNACK', 'POST_WORKOUT'],
        calories: 280, protein: 25, carbs: 30, fats: 5,
        timeMinutes: 2, difficulty: 'EASY', icon: '🍍', color: 'from-yellow-400 to-orange-500',
        ingredients: {
            [Language.PT]: ['1 dose Whey Protein Baunilha', '100g Abacaxi congelado', '200ml Água de coco', 'Hortelã'],
            [Language.EN]: ['1 scoop Vanilla Whey', '100g Frozen pineapple', '200ml Coconut water', 'Mint'],
            [Language.ES]: ['1 scoop Whey Vainilla', '100g Piña congelada', '200ml Agua de coco', 'Menta']
        },
        instructions: {
            [Language.PT]: ['Bata tudo no liquidificador até ficar cremoso.', 'Beba gelado.'],
            [Language.EN]: ['Blend everything until creamy.', 'Drink cold.'],
            [Language.ES]: ['Licúa todo hasta obtener una crema.', 'Bebe frío.']
        }
    },

    // === CAFÉ DA MANHÃ / LANCHES (INVERNO) ===
    {
        id: 'rec_mingau_aveia_banana',
        title: { [Language.PT]: 'Mingau de Aveia com Banana', [Language.EN]: 'Banana Oatmeal Porridge', [Language.ES]: 'Gachas de Avena con Plátano' },
        category: 'WINTER',
        mealTypes: ['BREAKFAST', 'PRE_WORKOUT'],
        calories: 340, protein: 12, carbs: 55, fats: 6,
        timeMinutes: 10, difficulty: 'EASY', icon: '🍌', color: 'from-yellow-500 to-amber-600',
        ingredients: {
            [Language.PT]: ['40g Aveia', '200ml Leite desnatado', '1 Banana amassada', 'Canela em pó'],
            [Language.EN]: ['40g Oats', '200ml Skim milk', '1 Mashed banana', 'Cinnamon powder'],
            [Language.ES]: ['40g Avena', '200ml Leche descremada', '1 Plátano machacado', 'Canela en polvo']
        },
        instructions: {
            [Language.PT]: ['Cozinhe a aveia com leite em fogo baixo.', 'Quando engrossar, adicione a banana.', 'Sirva quente com canela.'],
            [Language.EN]: ['Cook oats with milk over low heat.', 'When thick, add banana.', 'Serve hot with cinnamon.'],
            [Language.ES]: ['Cocina la avena con leche a fuego lento.', 'Cuando espese, añade el plátano.', 'Sirve caliente con canela.']
        }
    },

    // === PRÉ/PÓS TREINO ===
    {
        id: 'rec_crepioca',
        title: { [Language.PT]: 'Crepioca de Frango', [Language.EN]: 'Chicken Crepioca', [Language.ES]: 'Crepioca de Pollo' },
        category: 'SUMMER', // Neutro, pode ser ambos
        mealTypes: ['BREAKFAST', 'PRE_WORKOUT', 'DINNER'],
        calories: 310, protein: 28, carbs: 20, fats: 10,
        timeMinutes: 10, difficulty: 'EASY', icon: '🥞', color: 'from-amber-200 to-amber-400',
        ingredients: {
            [Language.PT]: ['1 Ovo', '2 col. sopa Goma de Tapioca', '100g Frango desfiado', 'Sal a gosto'],
            [Language.EN]: ['1 Egg', '2 tbsp Tapioca flour', '100g Shredded chicken', 'Salt to taste'],
            [Language.ES]: ['1 Huevo', '2 cdas Harina de tapioca', '100g Pollo desmechado', 'Sal al gusto']
        },
        instructions: {
            [Language.PT]: ['Bata o ovo com a tapioca.', 'Despeje na frigideira antiaderente.', 'Quando firmar, recheie com frango e dobre.', 'Doure os dois lados.'],
            [Language.EN]: ['Whisk egg and tapioca.', 'Pour onto non-stick pan.', 'When set, stuff with chicken and fold.', 'Brown both sides.'],
            [Language.ES]: ['Bate el huevo con la tapioca.', 'Vierte en sartén antiadherente.', 'Cuando cuaje, rellena con pollo y dobla.', 'Dora ambos lados.']
        }
    },

    // === SOBREMESAS ===
    {
        id: 'rec_mousse_chocolate_fit',
        title: { [Language.PT]: 'Mousse de Chocolate Fit', [Language.EN]: 'Fit Chocolate Mousse', [Language.ES]: 'Mousse de Chocolate Fit' },
        category: 'SUMMER',
        mealTypes: ['SNACK'],
        calories: 150, protein: 8, carbs: 12, fats: 8,
        timeMinutes: 60, difficulty: 'EASY', icon: '🍫', color: 'from-amber-800 to-stone-900',
        ingredients: {
            [Language.PT]: ['1/2 Abacate maduro', '2 col. sopa Cacau em pó 100%', 'Adoçante a gosto', 'Gotas de baunilha'],
            [Language.EN]: ['1/2 Ripe avocado', '2 tbsp Cocoa powder 100%', 'Sweetener to taste', 'Vanilla drops'],
            [Language.ES]: ['1/2 Aguacate maduro', '2 cdas Cacao en polvo 100%', 'Edulcorante al gusto', 'Gotas de vainilla']
        },
        instructions: {
            [Language.PT]: ['Bata tudo no processador até ficar liso.', 'Gele por 1 hora antes de servir.'],
            [Language.EN]: ['Blend everything until smooth.', 'Chill for 1 hour before serving.'],
            [Language.ES]: ['Procesa todo hasta que esté suave.', 'Enfría por 1 hora antes de servir.']
        }
    },
    // === NOVAS RECEITAS DE VERÃO ===
    {
        id: 'rec_salada_grao_bico',
        title: { [Language.PT]: 'Salada de Grão de Bico e Atum', [Language.EN]: 'Chickpea and Tuna Salad', [Language.ES]: 'Ensalada de Garbanzos y Atún' },
        category: 'SUMMER',
        mealTypes: ['LUNCH', 'DINNER'],
        calories: 380, protein: 32, carbs: 40, fats: 10,
        timeMinutes: 10, difficulty: 'EASY', icon: '🥗', color: 'from-green-400 to-emerald-500',
        ingredients: {
            [Language.PT]: ['1 lata de Atum em água', '100g Grão de bico cozido', 'Tomate cereja', 'Cebola roxa', 'Salsinha e Limão'],
            [Language.EN]: ['1 can Tuna in water', '100g Cooked chickpeas', 'Cherry tomatoes', 'Red onion', 'Parsley and Lemon'],
            [Language.ES]: ['1 lata de Atún en agua', '100g Garbanzos cocidos', 'Tomates cherry', 'Cebolla morada', 'Perejil y Limón']
        },
        instructions: {
            [Language.PT]: ['Misture todos os ingredientes em uma tigela.', 'Tempere com limão, sal e azeite.', 'Sirva frio.'],
            [Language.EN]: ['Mix all ingredients in a bowl.', 'Season with lemon, salt and olive oil.', 'Serve cold.'],
            [Language.ES]: ['Mezcla todos los ingredientes en un bol.', 'Sazona con limón, sal y aceite de oliva.', 'Sirve frío.']
        }
    },
    {
        id: 'rec_wrap_frango',
        title: { [Language.PT]: 'Wrap de Frango com Abacate', [Language.EN]: 'Chicken Avocado Wrap', [Language.ES]: 'Wrap de Pollo y Aguacate' },
        category: 'SUMMER',
        mealTypes: ['LUNCH', 'SNACK'],
        calories: 420, protein: 30, carbs: 35, fats: 18,
        timeMinutes: 10, difficulty: 'EASY', icon: '🌯', color: 'from-green-500 to-lime-500',
        ingredients: {
            [Language.PT]: ['1 Tortilla integral', '100g Frango grelhado em tiras', '1/4 Abacate', 'Alface e Tomate', 'Iogurte natural como molho'],
            [Language.EN]: ['1 Whole wheat tortilla', '100g Grilled chicken strips', '1/4 Avocado', 'Lettuce and Tomato', 'Plain yogurt as sauce'],
            [Language.ES]: ['1 Tortilla integral', '100g Tiras de pollo a la parrilla', '1/4 Aguacate', 'Lechuga y Tomate', 'Yogur natural como salsa']
        },
        instructions: {
            [Language.PT]: ['Aqueça a tortilla levemente.', 'Espalhe o iogurte.', 'Coloque o frango, abacate e salada.', 'Enrole e corte ao meio.'],
            [Language.EN]: ['Warm tortilla slightly.', 'Spread yogurt.', 'Add chicken, avocado and salad.', 'Roll and cut in half.'],
            [Language.ES]: ['Calienta la tortilla ligeramente.', 'Unta el yogur.', 'Añade el pollo, aguacate y ensalada.', 'Enrolla y corta por la mitad.']
        }
    },
    {
        id: 'rec_poke_salmao',
        title: { [Language.PT]: 'Poke de Salmão Express', [Language.EN]: 'Express Salmon Poke', [Language.ES]: 'Poke de Salmón Express' },
        category: 'SUMMER',
        mealTypes: ['LUNCH', 'DINNER'],
        calories: 500, protein: 35, carbs: 45, fats: 18,
        timeMinutes: 15, difficulty: 'MEDIUM', icon: '🍛', color: 'from-orange-400 to-red-400',
        ingredients: {
            [Language.PT]: ['100g Salmão cru em cubos', '100g Arroz japonês (gohan)', 'Pepino, Manga, Cenoura', 'Molho shoyu light', 'Gergelim'],
            [Language.EN]: ['100g Raw salmon cubes', '100g Sushi rice', 'Cucumber, Mango, Carrot', 'Light soy sauce', 'Sesame seeds'],
            [Language.ES]: ['100g Cubos de salmón crudo', '100g Arroz de sushi', 'Pepino, Mango, Zanahoria', 'Salsa de soja ligera', 'Sésamo']
        },
        instructions: {
            [Language.PT]: ['Monte o arroz na base.', 'Disponha o peixe e os acompanhamentos por cima.', 'Finalize com shoyu e gergelim.'],
            [Language.EN]: ['Place rice at the base.', 'Arrange fish and sides on top.', 'Finish with soy sauce and sesame.'],
            [Language.ES]: ['Coloca el arroz en la base.', 'Dispón el pescado y los acompañamientos encima.', 'Finaliza con salsa de soja y sésamo.']
        }
    },
    {
        id: 'rec_smoothie_verde',
        title: { [Language.PT]: 'Smoothie Verde Detox', [Language.EN]: 'Green Detox Smoothie', [Language.ES]: 'Batido Verde Detox' },
        category: 'SUMMER',
        mealTypes: ['BREAKFAST', 'SNACK'],
        calories: 180, protein: 5, carbs: 35, fats: 2,
        timeMinutes: 5, difficulty: 'EASY', icon: '🥤', color: 'from-green-300 to-green-500',
        ingredients: {
            [Language.PT]: ['1 Maçã verde com casca', '1 folha de Couve', 'Gengibre', 'Suco de 1 Limão', '200ml Água de coco'],
            [Language.EN]: ['1 Green apple with skin', '1 Kale leaf', 'Ginger', 'Juice of 1 Lemon', '200ml Coconut water'],
            [Language.ES]: ['1 Manzana verde con piel', '1 Hoja de col rizada', 'Jengibre', 'Jugo de 1 Limón', '200ml Agua de coco']
        },
        instructions: {
            [Language.PT]: ['Bata tudo no liquidificador com gelo.', 'Não coe para manter as fibras.'],
            [Language.EN]: ['Blend everything with ice.', 'Do not strain to keep fibers.'],
            [Language.ES]: ['Licúa todo con hielo.', 'No cueles para mantener la fibra.']
        }
    },

    // === NOVAS RECEITAS DE INVERNO ===
    {
        id: 'rec_sopa_lentilha',
        title: { [Language.PT]: 'Sopa de Lentilha Proteica', [Language.EN]: 'Protein Lentil Soup', [Language.ES]: 'Sopa de Lentejas Proteica' },
        category: 'WINTER',
        mealTypes: ['LUNCH', 'DINNER'],
        calories: 320, protein: 18, carbs: 45, fats: 6,
        timeMinutes: 40, difficulty: 'MEDIUM', icon: '🍲', color: 'from-yellow-600 to-orange-700',
        ingredients: {
            [Language.PT]: ['1 xícara Lentilha', '1 Cenoura picada', '1/2 Cebola', 'Alho', 'Caldo de legumes natural'],
            [Language.EN]: ['1 cup Lentils', '1 Chopped carrot', '1/2 Onion', 'Garlic', 'Natural vegetable broth'],
            [Language.ES]: ['1 taza Lentejas', '1 Zanahoria picada', '1/2 Cebolla', 'Ajo', 'Caldo de verduras natural']
        },
        instructions: {
            [Language.PT]: ['Refogue cebola, alho e cenoura.', 'Adicione a lentilha e o caldo.', 'Cozinhe por 30min até amaciar.', 'Tempere a gosto.'],
            [Language.EN]: ['Sauté onion, garlic and carrot.', 'Add lentils and broth.', 'Simmer for 30min until soft.', 'Season to taste.'],
            [Language.ES]: ['Saltea cebolla, ajo y zanahoria.', 'Añade lentejas y caldo.', 'Cocina 30min hasta ablandar.', 'Sazona al gusto.']
        }
    },
    {
        id: 'rec_strogonoff_fit',
        title: { [Language.PT]: 'Strogonoff Fit de Frango', [Language.EN]: 'Fit Chicken Stroganoff', [Language.ES]: 'Strogonoff de Pollo Fit' },
        category: 'WINTER',
        mealTypes: ['LUNCH', 'DINNER'],
        calories: 380, protein: 35, carbs: 12, fats: 15,
        timeMinutes: 25, difficulty: 'MEDIUM', icon: '🥘', color: 'from-orange-500 to-red-500',
        ingredients: {
            [Language.PT]: ['150g Peito de frango em cubos', 'Molho de tomate caseiro', '2 col. sopa Iogurte natural (substitui creme de leite)', 'Cogumelos'],
            [Language.EN]: ['150g Diced chicken breast', 'Homemade tomato sauce', '2 tbsp Plain yogurt (replaces cream)', 'Mushrooms'],
            [Language.ES]: ['150g Pechuga de pollo en cubos', 'Salsa de tomate casera', '2 cdas Yogur natural (sustituye crema)', 'Champiñones']
        },
        instructions: {
            [Language.PT]: ['Refogue o frango.', 'Adicione molho de tomate e cogumelos.', 'Desligue o fogo e misture o iogurte para não talhar.'],
            [Language.EN]: ['Sauté chicken.', 'Add tomato sauce and mushrooms.', 'Turn off heat and stir in yogurt.'],
            [Language.ES]: ['Saltea el pollo.', 'Añade salsa de tomate y champiñones.', 'Apaga el fuego y mezcla el yogur.']
        }
    },
    {
        id: 'rec_risoto_fake',
        title: { [Language.PT]: 'Risoto de Couve-Flor', [Language.EN]: 'Cauliflower Risotto', [Language.ES]: 'Risotto de Coliflor' },
        category: 'WINTER',
        mealTypes: ['DINNER'],
        calories: 250, protein: 12, carbs: 15, fats: 14,
        timeMinutes: 20, difficulty: 'MEDIUM', icon: '🍚', color: 'from-stone-200 to-stone-400',
        ingredients: {
            [Language.PT]: ['200g Couve-flor triturada (arroz)', 'Queijo parmesão ralado', '1 col. requeijão light', 'Caldo de legumes'],
            [Language.EN]: ['200g Riced cauliflower', 'Grated parmesan', '1 tbsp Light cream cheese', 'Vegetable broth'],
            [Language.ES]: ['200g Coliflor triturada (arroz)', 'Queso parmesano rallado', '1 cda Queso crema ligero', 'Caldo de verduras']
        },
        instructions: {
            [Language.PT]: ['Refogue a couve-flor como se fosse arroz.', 'Vá adicionando caldo aos poucos.', 'Finalize com queijos para cremosidade.'],
            [Language.EN]: ['Sauté cauliflower like rice.', 'Add broth gradually.', 'Finish with cheeses for creaminess.'],
            [Language.ES]: ['Saltea la coliflor como arroz.', 'Añade caldo poco a poco.', 'Finaliza con quesos para cremosidad.']
        }
    },
    {
        id: 'rec_omelete_forno',
        title: { [Language.PT]: 'Omelete de Forno com Espinafre', [Language.EN]: 'Baked Spinach Omelet', [Language.ES]: 'Tortilla de Horno con Espinaca' },
        category: 'WINTER',
        mealTypes: ['BREAKFAST', 'DINNER'],
        calories: 280, protein: 22, carbs: 5, fats: 18,
        timeMinutes: 20, difficulty: 'EASY', icon: '🍳', color: 'from-yellow-300 to-yellow-500',
        ingredients: {
            [Language.PT]: ['3 Ovos', '1 xícara Espinafre picado', 'Tomate picado', 'Queijo branco em cubos'],
            [Language.EN]: ['3 Eggs', '1 cup Chopped spinach', 'Chopped tomato', 'Diced white cheese'],
            [Language.ES]: ['3 Huevos', '1 taza Espinaca picada', 'Tomate picado', 'Queso blanco en cubos']
        },
        instructions: {
            [Language.PT]: ['Bata os ovos com sal.', 'Misture os vegetais e queijo.', 'Coloque em forminhas de muffin ou travessa.', 'Asse por 20min.'],
            [Language.EN]: ['Whisk eggs with salt.', 'Mix in veggies and cheese.', 'Pour into muffin tins or dish.', 'Bake for 20min.'],
            [Language.ES]: ['Bate los huevos con sal.', 'Mezcla vegetales y queso.', 'Vierte en moldes o bandeja.', 'Hornea por 20min.']
        }
    }
];

export const getRecipesByCategory = (category: RecipeCategory) => {
    return RECIPE_DATABASE.filter(r => r.category === category);
};

export const getRecipesByMealType = (type: MealType) => {
    return RECIPE_DATABASE.filter(r => r.mealTypes.includes(type));
};
