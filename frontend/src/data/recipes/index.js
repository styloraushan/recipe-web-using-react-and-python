import { northIndianRecipes } from './north-indian';
import { southIndianRecipes } from './south-indian';
import { eastIndianRecipes } from './east-indian';
import { westIndianRecipes } from './west-indian';
import { centralIndianRecipes } from './central-indian';

export const recipes = [
  ...northIndianRecipes,
  ...southIndianRecipes,
  ...eastIndianRecipes,
  ...westIndianRecipes,
  ...centralIndianRecipes
];