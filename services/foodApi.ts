
import { FoodItem, Language } from '../types';
import { searchFoods } from '../data/foods';
import { StorageService } from './storage';

/**
 * Service to search foods from Local DB + External API (OpenFoodFacts)
 * This fulfills the requirement of "Connecting to Food APIs"
 */
export const FoodApiService = {
    // 1. Fast Local Search (Sync)
    searchLocal(query: string, lang: Language): FoodItem[] {
        if (!query || query.length < 2) return [];

        const localResults = searchFoods(query, lang);
        const customResults = StorageService.getCustomFoods().filter(f =>
            f.name[lang].toLowerCase().includes(query.toLowerCase())
        );

        return [...customResults, ...localResults];
    },

    // 2. Slow External Search (Async)
    async searchExternal(query: string, lang: Language, country?: string): Promise<FoodItem[]> {
        if (query.length < 3) return [];

        try {
            // Select node based on country (Priority) or language (Fallback)
            let subdomain = 'world';

            if (country && country !== 'OTHER') {
                const c = country.toLowerCase();
                // Map common codes to OFF subdomains if needed, but mostly they match ISO 2 chars
                // GB -> uk in OFF usually? Actually uk works for OFF.
                if (c === 'gb' || c === 'uk') subdomain = 'uk';
                else subdomain = c;
            } else {
                // Fallback to Language
                if (lang === Language.PT) subdomain = 'br';
                else if (lang === Language.ES) subdomain = 'es';
                else subdomain = 'us'; // Default EN -> US
            }

            console.log(`🌐 Searching OpenFoodFacts (${subdomain}) for: ${query}`);

            const response = await fetch(
                `https://${subdomain}.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=25&fields=code,product_name,product_name_en,product_name_pt,product_name_es,nutriments,_id,lang`
            );

            if (!response.ok) return [];

            const data = await response.json();
            const products = data.products || [];

            return products
                // Filter out items with missing critical data
                .filter((p: any) =>
                    (p.product_name || p.product_name_en || p.product_name_pt || p.product_name_es) &&
                    (p.nutriments['energy-kcal_100g'] !== undefined || p.nutriments['energy-kcal'] !== undefined)
                )
                .map((p: any) => {
                    const namePT = p.product_name_pt || p.product_name || p.product_name_en;
                    const nameEN = p.product_name_en || p.product_name;
                    const nameES = p.product_name_es || p.product_name || p.product_name_en;

                    const nameObj = {
                        [Language.PT]: namePT || 'Alimento desconhecido',
                        [Language.EN]: nameEN || 'Unknown food',
                        [Language.ES]: nameES || 'Alimento desconocido'
                    };

                    return {
                        id: `off_${p.code}`,
                        name: nameObj,
                        calories: Math.round(p.nutriments['energy-kcal_100g'] || p.nutriments['energy-kcal'] || 0),
                        protein: Math.round(p.nutriments['proteins_100g'] || p.nutriments['proteins'] || 0),
                        carbs: Math.round(p.nutriments['carbohydrates_100g'] || p.nutriments['carbohydrates'] || 0),
                        fats: Math.round(p.nutriments['fat_100g'] || p.nutriments['fat'] || 0),
                        category: 'OTHER'
                    };
                });

        } catch (error) {
            console.error("Failed to fetch external foods", error);
            return [];
        }
    },

    // Legacy Combined Search (for backward compatibility if needed, but we'll migrate)
    async search(query: string, lang: Language): Promise<FoodItem[]> {
        const local = this.searchLocal(query, lang);
        const external = await this.searchExternal(query, lang);

        // Merge & Deduplicate
        const all = [...local, ...external];
        return all.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.name[lang] === item.name[lang] && t.calories === item.calories
            ))
        );
    }
};
