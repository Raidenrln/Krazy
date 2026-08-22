// lib/advancements.ts

export type AdvancementCategory = "story" | "nether" | "end" | "adventure" | "husbandry";

export interface ChecklistItem {
  key: string;   // exact key as it appears in the save file's criteria object
  label: string; // readable label
}

export interface AdvancementMeta {
  title: string;
  description: string;
  category: AdvancementCategory;
  checklist?: ChecklistItem[];
}

export const shortKey = (rawKey: string) => rawKey.replace(/^minecraft:/, "");
// Only counts keys that are actually known advancements (excludes DataVersion,
// recipes/*, and anything else that isn't in ADVANCEMENT_META).
export const isRealAdvancement = (rawKey: string) => shortKey(rawKey) in ADVANCEMENT_META;

export const formatLabel = (key: string) =>
  key
    .replace(/^minecraft:/, "")
    .split("_")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

// Builds checklist items whose data-file key is "minecraft:<name>"
const mcList = (names: string[]): ChecklistItem[] =>
  names.map((n) => ({ key: `minecraft:${n}`, label: formatLabel(n) }));

// Builds checklist items whose data-file key is the bare name (no namespace)
const bareList = (names: string[]): ChecklistItem[] =>
  names.map((n) => ({ key: n, label: formatLabel(n) }));

// ---- Checklists for multi-requirement advancements -------------------

// All 54 Overworld biomes (1.21.4+) — matches "minecraft:<biome>" criteria keys
const ADVENTURING_TIME_BIOMES = mcList([
  "beach", "grove", "ocean", "river", "swamp", "taiga", "desert", "forest",
  "jungle", "meadow", "plains", "savanna", "badlands", "deep_dark",
  "cold_ocean", "deep_ocean", "ice_spikes", "lush_caves", "warm_ocean",
  "dark_forest", "pale_garden", "snowy_beach", "snowy_taiga", "stony_peaks",
  "stony_shore", "birch_forest", "cherry_grove", "frozen_ocean",
  "frozen_peaks", "frozen_river", "jagged_peaks", "snowy_plains",
  "snowy_slopes", "bamboo_jungle", "flower_forest", "sparse_jungle",
  "lukewarm_ocean", "mangrove_swamp", "deep_cold_ocean", "dripstone_caves",
  "eroded_badlands", "mushroom_fields", "savanna_plateau", "windswept_hills",
  "wooded_badlands", "sunflower_plains", "windswept_forest",
  "deep_frozen_ocean", "windswept_savanna", "deep_lukewarm_ocean",
  "old_growth_pine_taiga", "old_growth_birch_forest",
  "old_growth_spruce_taiga", "windswept_gravelly_hills",
]);

const KILL_ALL_MOBS = mcList([
  "vex", "husk", "blaze", "ghast", "slime", "stray", "witch", "bogged",
  "breeze", "evoker", "hoglin", "piglin", "spider", "wither", "zoglin",
  "zombie", "creeper", "drowned", "parched", "phantom", "ravager",
  "shulker", "creaking", "enderman", "guardian", "pillager", "skeleton",
  "endermite", "camel_husk", "magma_cube", "silverfish", "vindicator",
  "cave_spider", "ender_dragon", "piglin_brute", "zombie_horse",
  "elder_guardian", "wither_skeleton", "zombie_nautilus", "zombie_villager",
  "zombified_piglin",
]);

const BALANCED_DIET_FOODS = bareList([
  "cod", "beef", "apple", "bread", "carrot", "cookie", "mutton", "potato",
  "rabbit", "salmon", "chicken", "beetroot", "porkchop", "cooked_cod",
  "dried_kelp", "pufferfish", "spider_eye", "cooked_beef", "melon_slice",
  "pumpkin_pie", "rabbit_stew", "baked_potato", "chorus_fruit",
  "glow_berries", "golden_apple", "honey_bottle", "rotten_flesh",
  "beetroot_soup", "cooked_mutton", "cooked_rabbit", "cooked_salmon",
  "golden_carrot", "mushroom_stew", "sweet_berries", "tropical_fish",
  "cooked_chicken", "cooked_porkchop", "suspicious_stew",
  "poisonous_potato", "enchanted_golden_apple",
]);

const CAT_VARIANTS = mcList([
  "red", "black", "tabby", "white", "calico", "jellie", "persian",
  "ragdoll", "siamese", "all_black", "british_shorthair",
]);

const WOLF_VARIANTS = mcList([
  "pale", "ashen", "black", "rusty", "snowy", "woods", "spotted",
  "striped", "chestnut",
]);

const BRED_ANIMALS = mcList([
  "bee", "cat", "cow", "fox", "pig", "frog", "goat", "mule", "wolf",
  "camel", "horse", "llama", "panda", "sheep", "donkey", "hoglin",
  "ocelot", "rabbit", "turtle", "axolotl", "chicken", "sniffer",
  "strider", "nautilus", "armadillo", "mooshroom",
]);

const NETHER_BIOMES = mcList([
  "basalt_deltas", "nether_wastes", "warped_forest", "crimson_forest",
  "soul_sand_valley",
]);

const FROG_VARIANTS = mcList(["cold", "warm", "temperate"]);

const EXCLUSIVE_TRIMS: ChecklistItem[] = [
  "rib", "vex", "tide", "ward", "snout", "spire", "silence", "wayfinder",
].map((n) => ({
  key: `armor_trimmed_minecraft:${n}_armor_trim_smithing_template_smithing_trim`,
  label: `${formatLabel(n)} Trim`,
}));

// ---- Full advancement metadata ---------------------------------------

export const ADVANCEMENT_META: Record<string, AdvancementMeta> = {
  // STORY
  "story/root": { title: "Minecraft", description: "The heart and story of the game.", category: "story" },
  "story/mine_stone": { title: "Stone Age", description: "Attack a stone block with your new pickaxe.", category: "story" },
  "story/upgrade_tools": { title: "Getting an Upgrade", description: "Construct a better pickaxe.", category: "story" },
  "story/smelt_iron": { title: "Acquire Hardware", description: "Smelt an iron ingot.", category: "story" },
  "story/obtain_armor": { title: "Suit Up", description: "Get a full suit of iron armor.", category: "story" },
  "story/lava_bucket": { title: "Hot Stuff", description: "Fill a bucket with lava.", category: "story" },
  "story/iron_tools": { title: "Isn't It Iron Pick", description: "Upgrade your pickaxe.", category: "story" },
  "story/deflect_arrow": { title: "Not Today, Thank You", description: "Block a projectile with a shield.", category: "story" },
  "story/form_obsidian": { title: "Ice Bucket Challenge", description: "Obtain obsidian.", category: "story" },
  "story/mine_diamond": { title: "Diamonds!", description: "Acquire diamonds.", category: "story" },
  "story/enter_the_nether": { title: "We Need to Go Deeper", description: "Build, light and enter a Nether Portal.", category: "story" },
  "story/shiny_gear": { title: "Cover Me With Diamonds", description: "Diamond armor saves lives.", category: "story" },
  "story/enchant_item": { title: "Enchanter", description: "Enchant an item at an enchanting table.", category: "story" },
  "story/cure_zombie_villager": { title: "Zombie Doctor", description: "Weaken and then cure a zombie villager.", category: "story" },
  "story/follow_ender_eye": { title: "Eye Spy", description: "Follow an Ender Eye.", category: "story" },
  "story/enter_the_end": { title: "The End?", description: "Enter the End Portal.", category: "story" },

  // NETHER
  "nether/root": { title: "Nether", description: "Bring summer clothes.", category: "nether" },
  "nether/fast_travel": { title: "Subspace Bubble", description: "Use the Nether to travel 7 km in the Overworld.", category: "nether" },
  "nether/find_fortress": { title: "A Terrible Fortress", description: "Break your way into a Nether Fortress.", category: "nether" },
  "nether/obtain_blaze_rod": { title: "Into Fire", description: "Relieve a Blaze of its rod.", category: "nether" },
  "nether/obtain_ancient_debris": { title: "Hidden in the Depths", description: "Obtain ancient debris.", category: "nether" },
  "nether/return_to_sender": { title: "Return to Sender", description: "Destroy a Ghast with a fireball.", category: "nether" },
  "nether/uneasy_alliance": { title: "Uneasy Alliance", description: "Rescue a Ghast from the Nether, bring it safely home to the Overworld... and then kill it.", category: "nether" },
  "nether/loot_bastion": { title: "War Pigs", description: "Loot a chest in a Bastion Remnant.", category: "nether" },
  "nether/distract_piglin": { title: "Oh Shiny", description: "Distract piglins with gold.", category: "nether" },
  "nether/ride_strider": { title: "This Boat Has Legs", description: "Ride a Strider with a Warped Fungus on a Stick.", category: "nether" },
  "nether/ride_strider_in_overworld_lava": { title: "Feels Like Home", description: "Take a Strider for a loooong ride on a lava lake in the Overworld.", category: "nether" },
  "nether/create_beacon": { title: "Bring Home the Beacon", description: "Construct and place a Beacon.", category: "nether" },
  "nether/all_potions": { title: "A Furious Cocktail", description: "Have every potion effect applied at the same time.", category: "nether" },
  "nether/create_full_beacon": { title: "Beaconator", description: "Bring a beacon to full power.", category: "nether" },
  "nether/all_effects": { title: "How Did We Get Here?", description: "Have every effect applied at the same time.", category: "nether" },
  "nether/charge_respawn_anchor": { title: "Not Quite \u201cNine\u201d Lives", description: "Charge a respawn anchor to the maximum.", category: "nether" },
  "nether/explore_nether": {
    title: "Hot Tourist Destinations",
    description: "Explore all five Nether biomes.",
    category: "nether",
    checklist: NETHER_BIOMES,
  },
  "nether/find_bastion": { title: "Those Were the Days", description: "Enter a Bastion Remnant.", category: "nether" },
  "nether/netherite_armor": { title: "Cover Me in Debris", description: "Get a full suit of netherite armor.", category: "nether" },
  "nether/get_wither_skull": { title: "Spooky Scary Skeleton", description: "Obtain a wither skeleton's skull.", category: "nether" },
  "nether/obtain_crying_obsidian": { title: "Who's Cutting Onions?", description: "Obtain crying obsidian.", category: "nether" },
  "nether/brew_potion": { title: "Local Brewery", description: "Brew a potion.", category: "nether" },
  "nether/summon_wither": { title: "Withering Heights", description: "Summon the Wither.", category: "nether" },

  // END
  "end/root": { title: "The End", description: "Or the beginning?", category: "end" },
  "end/kill_dragon": { title: "Free the End", description: "Good luck.", category: "end" },
  "end/dragon_egg": { title: "The Next Generation", description: "Hold the dragon egg.", category: "end" },
  "end/dragon_breath": { title: "You Need a Mint", description: "Collect dragon's breath in a glass bottle.", category: "end" },
  "end/enter_end_gateway": { title: "Remote Getaway", description: "Escape the island.", category: "end" },
  "end/find_end_city": { title: "The City at the End of the Game", description: "Go on in, what could happen?", category: "end" },
  "end/elytra": { title: "Sky's the Limit", description: "Find elytra.", category: "end" },
  "end/levitate": { title: "Great View From Up Here", description: "Levitate up 50 blocks from the attacks of a Shulker.", category: "end" },
  "end/respawn_dragon": { title: "The End... Again...", description: "Respawn the ender dragon.", category: "end" },

  // ADVENTURE
  "adventure/root": { title: "Adventure", description: "Adventure, exploration and combat.", category: "adventure" },
  "adventure/voluntary_exile": { title: "Voluntary Exile", description: "Kill a raid captain. Maybe consider staying away from villages for the time being...", category: "adventure" },
  "adventure/kill_a_mob": { title: "Monster Hunter", description: "Kill any hostile monster.", category: "adventure" },
  "adventure/kill_all_mobs": {
    title: "Monsters Hunted",
    description: "Kill one of every hostile monster in the game.",
    category: "adventure",
    checklist: KILL_ALL_MOBS,
  },
  "adventure/trade": { title: "What a Deal!", description: "Successfully trade with a villager.", category: "adventure" },
  "adventure/honey_block_slide": { title: "Sticky Situation", description: "Jump into a honey block to break your fall.", category: "adventure" },
  "adventure/ol_betsy": { title: "Ol' Betsy", description: "Shoot a crossbow.", category: "adventure" },
  "adventure/sleep_in_bed": { title: "Sweet Dreams", description: "Sleep in a bed to change your respawn point.", category: "adventure" },
  "adventure/hero_of_the_village": { title: "Hero of the Village", description: "Successfully defend a village from a raid.", category: "adventure" },
  "adventure/throw_trident": { title: "A Throwaway Joke", description: "Throw a trident at something. Note: throwing away your only weapon is not a good idea.", category: "adventure" },
  "adventure/shoot_arrow": { title: "Take Aim", description: "Shoot something with an arrow.", category: "adventure" },
  "adventure/totem_of_undying": { title: "Postmortal", description: "Use a Totem of Undying to cheat death.", category: "adventure" },
  "adventure/summon_iron_golem": { title: "Hired Help", description: "Summon an Iron Golem to help defend a village.", category: "adventure" },
  "adventure/two_birds_one_arrow": { title: "Two Birds, One Arrow", description: "Kill two Phantoms with a piercing arrow.", category: "adventure" },
  "adventure/whos_the_pillager_now": { title: "Who's the Pillager Now?", description: "Give a pillager a taste of their own medicine.", category: "adventure" },
  "adventure/who_needs_rockets": { title: "Who Needs Rockets?", description: "Use a Wind Charge to launch yourself upwards 8 blocks.", category: "adventure" },
  "adventure/arbalistic": { title: "Arbalistic", description: "Kill five unique mobs with one crossbow shot.", category: "adventure" },
  "adventure/adventuring_time": {
    title: "Adventuring Time",
    description: "Discover every one of the 54 Overworld biomes, from sun-baked badlands to the deep dark beneath your feet. Flying over or teleporting into a biome both count — you just have to physically enter it once.",
    category: "adventure",
    checklist: ADVENTURING_TIME_BIOMES,
  },
  "adventure/very_very_frightening": { title: "Very Very Frightening", description: "Strike a villager with lightning.", category: "adventure" },
  "adventure/sniper_duel": { title: "Sniper Duel", description: "Kill a skeleton with an arrow from at least 50 meters.", category: "adventure" },
  "adventure/bullseye": { title: "Bullseye", description: "Hit the bullseye of a Target block from at least 30 meters away.", category: "adventure" },
  "adventure/trade_at_world_height": { title: "Star Trader", description: "Trade with a villager at the build height limit.", category: "adventure" },
  "adventure/salvage_sherd": { title: "Respecting the Remnants", description: "Brush a Suspicious block to obtain a Pottery Sherd.", category: "adventure" },
  "adventure/under_lock_and_key": { title: "Under Lock and Key", description: "Unlock a vault with an ominous trial key.", category: "adventure" },
  "adventure/revaulting": { title: "Revaulting", description: "Unlock an ominous vault with an ominous trial key.", category: "adventure" },
  "adventure/craft_decorated_pot_using_only_sherds": { title: "Careful Restoration", description: "Craft a Decorated Pot out of 4 Pottery Sherds.", category: "adventure" },
  "adventure/spyglass_at_parrot": { title: "Is It a Bird?", description: "Look at a parrot through a spyglass.", category: "adventure" },
  "adventure/spyglass_at_ghast": { title: "Is It a Balloon?", description: "Look at a ghast through a spyglass.", category: "adventure" },
  "adventure/spyglass_at_dragon": { title: "Is It a Plane?", description: "Look at the ender dragon through a spyglass.", category: "adventure" },
  "adventure/play_jukebox_in_meadows": { title: "Sound of Music", description: "Make the Meadows come alive with the sound of music from a Jukebox.", category: "adventure" },
  "adventure/walk_on_powder_snow_with_leather_boots": { title: "Light as a Rabbit", description: "Walk on Powder Snow... without sinking in it.", category: "adventure" },
  "adventure/lightning_rod_with_villager_no_fire": { title: "Surge Protector", description: "Protect a villager from an undesired shock without starting a fire.", category: "adventure" },
  "adventure/fall_from_world_height": { title: "Free Fall", description: "Free fall from build height to the bottom of the world and survive.", category: "adventure" },
  "adventure/kill_mob_near_sculk_catalyst": { title: "It Spreads", description: "A Sculk Catalyst converts the death of nearby creatures into more Sculk growth.", category: "adventure" },
  "adventure/avoid_vibration": { title: "Sneak 100", description: "Sneak near a Sculk Sensor or Warden to prevent it from detecting you.", category: "adventure" },
  "adventure/read_power_of_chiseled_bookshelf": { title: "The Power of Books", description: "Read the power signal of a Chiseled Bookshelf using a Comparator.", category: "adventure" },
  "adventure/trim_with_any_armor_pattern": { title: "Crafting a New Look", description: "Craft a trimmed armor piece at a Smithing Table.", category: "adventure" },
  "adventure/trim_with_all_exclusive_armor_patterns": {
    title: "Smithing With Style",
    description: "Apply all eight exclusive armor trim patterns to an armor piece at the Smithing Table at least once each.",
    category: "adventure",
    checklist: EXCLUSIVE_TRIMS,
  },
  "adventure/use_lodestone": { title: "Country Lode, Take Me Home", description: "Use a compass on a lodestone.", category: "adventure" },
  "adventure/heart_transplanter": { title: "Heart Transplanter", description: "Place a Creaking Heart.", category: "adventure" },
  "adventure/minecraft_trials_edition": { title: "Minecraft: Trial(s) Edition", description: "Step foot in a Trial Chamber.", category: "adventure" },
  "adventure/crafters_crafting_crafters": { title: "Crafters Crafting Crafters", description: "Have a Crafter craft a Crafter.", category: "adventure" },
  "adventure/blowback": { title: "Blowback", description: "Kill a Breeze with a deflected Breeze-shot Wind Charge.", category: "adventure" },
  "adventure/lighten_up": { title: "Lighten Up", description: "Convert a Copper Bulb from powered to unpowered using an axe.", category: "adventure" },
  "adventure/brush_armadillo": { title: "Smells Interesting", description: "Get Armadillo Scutes from an Armadillo using a Brush.", category: "adventure" },
  "adventure/spear_many_mobs": { title: "Stay Sharp", description: "Kill three mobs with a single Mace hit thanks to Density.", category: "adventure" },
  "adventure/overoverkill": { title: "Overoverkill", description: "Deal 50 hearts of damage in a single hit using the Mace.", category: "adventure" },

  // HUSBANDRY
  "husbandry/root": { title: "Husbandry", description: "The world is full of friends and food.", category: "husbandry" },
  "husbandry/safely_harvest_honey": { title: "Bee Our Guest", description: "Use a Campfire to collect Honey from a Beehive using a Bottle, without aggravating the bees.", category: "husbandry" },
  "husbandry/breed_an_animal": { title: "The Parrots and the Bats", description: "Breed two animals together.", category: "husbandry" },
  "husbandry/tame_an_animal": { title: "Best Friends Forever", description: "Tame an animal.", category: "husbandry" },
  "husbandry/fishy_business": { title: "Fishy Business", description: "Catch a fish.", category: "husbandry" },
  "husbandry/silk_touch_nest": { title: "Total Beelocation", description: "Move a Bee Nest, with three bees inside, using Silk Touch.", category: "husbandry" },
  "husbandry/plant_seed": { title: "A Seedy Place", description: "Plant a seed and watch it grow.", category: "husbandry" },
  "husbandry/bred_all_animals": {
    title: "Two by Two",
    description: "Breed all the breedable animals in the game!",
    category: "husbandry",
    checklist: BRED_ANIMALS,
  },
  "husbandry/complete_catalogue": {
    title: "A Complete Catalogue",
    description: "Tame one of each cat variant.",
    category: "husbandry",
    checklist: CAT_VARIANTS,
  },
  "husbandry/tactical_fishing": { title: "Tactical Fishing", description: "Catch a fish... without a fishing rod!", category: "husbandry" },
  "husbandry/balanced_diet": {
    title: "A Balanced Diet",
    description: "Eat everything that is edible, even if it's not good for you.",
    category: "husbandry",
    checklist: BALANCED_DIET_FOODS,
  },
  "husbandry/obtain_netherite_hoe": { title: "Serious Dedication", description: "Obtain a Netherite Hoe.", category: "husbandry" },
  "husbandry/wax_on": { title: "Wax On", description: "Apply Honeycomb to a Copper block.", category: "husbandry" },
  "husbandry/wax_off": { title: "Wax Off", description: "Scrape wax off of a Copper block.", category: "husbandry" },
  "husbandry/make_a_sign_glow": { title: "Glow Up", description: "Make the text of any kind of sign glow.", category: "husbandry" },
  "husbandry/feed_snifflet": { title: "Little Sniffs", description: "Feed a Snifflet.", category: "husbandry" },
  "husbandry/axolotl_in_a_bucket": { title: "The Cutest Predator", description: "Catch an axolotl in a bucket.", category: "husbandry" },
  "husbandry/kill_axolotl_target": { title: "The Healing Power of Friendship!", description: "Team up with an axolotl and win a fight.", category: "husbandry" },
  "husbandry/tadpole_in_a_bucket": { title: "Bukkit Bukkit", description: "Catch a tadpole in a bucket.", category: "husbandry" },
  "husbandry/obtain_sniffer_egg": { title: "Smells Interesting", description: "Obtain a Sniffer Egg.", category: "husbandry" },
  "husbandry/plant_any_sniffer_seed": { title: "A Sniff of Times Past", description: "Plant any Sniffer seed.", category: "husbandry" },
  "husbandry/froglights": { title: "With Our Powers Combined!", description: "Have all three Froglights in your inventory at once.", category: "husbandry" },
  "husbandry/whole_pack": {
    title: "Whole Pack",
    description: "Tame one of each wolf variant.",
    category: "husbandry",
    checklist: WOLF_VARIANTS,
  },
  "husbandry/remove_wolf_armor": { title: "She Sells Seashells", description: "Remove Wolf Armor from a Wolf using Shears.", category: "husbandry" },
  "husbandry/repair_wolf_armor": { title: "Good as New", description: "Repair a damaged Wolf Armor using Armadillo Scutes.", category: "husbandry" },
  "husbandry/leash_all_frog_variants": {
    title: "When the Squad Hops Into Town",
    description: "Get each frog variant on a lead.",
    category: "husbandry",
    checklist: FROG_VARIANTS,
  },
  "husbandry/ride_a_boat_with_a_goat": { title: "Whatever Floats Your Goat!", description: "Ride a boat with a goat.", category: "husbandry" },
  "husbandry/place_dried_ghast_in_water": { title: "A Damp Rescue", description: "Place a Dried Ghast in water.", category: "husbandry" },
  "husbandry/allay_deliver_item_to_player": { title: "You've Got a Friend in Me", description: "Have an Allay deliver items to you.", category: "husbandry" },
  "husbandry/allay_deliver_cake_to_note_block": { title: "Birthday Song", description: "Have an Allay drop a Cake at a Note Block.", category: "husbandry" },
  "husbandry/uh_oh": { title: "Uh Oh", description: "Give TNT directly to a mob and see what happens.", category: "husbandry" },
};

export const CATEGORY_LABEL: Record<AdvancementCategory, string> = {
  story: "Story",
  nether: "Nether",
  end: "The End",
  adventure: "Adventure",
  husbandry: "Husbandry",
};

export const CATEGORY_COLOR: Record<AdvancementCategory, string> = {
  story: "var(--lapis)",
  nether: "var(--redstone)",
  end: "var(--violet)",
  adventure: "var(--gold)",
  husbandry: "var(--gold-dim)",
};