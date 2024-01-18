import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import './App.css';
import { Recipe, findAll } from './api/recipe';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await findAll();
        setRecipes(recipes);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Recipes</h1>
        </header>
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
