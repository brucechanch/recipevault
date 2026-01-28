import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeAPI } from "../api/client";

export default function MyRecipesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await recipeAPI.getAll();
        const data = res?.data;

        if (!mounted) return;

        const list = Array.isArray(data) ? data : (data?.recipes || []);
        setRecipes(Array.isArray(list) ? list : []);
      } catch (e) {
        setError(e?.response?.data?.error || e?.message || "Failed to load recipes");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <h2>My Recipes</h2>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <h2>My Recipes</h2>
        <div style={{ background: "#ffe6e6", padding: 12, borderRadius: 10 }}>
          {error}
        </div>
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <h2>My Recipes</h2>
        <p>You don’t have any recipes yet.</p>
        <Link to="/add-recipe">+ Add Recipe</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>My Recipes</h2>
        <Link to="/add-recipe">+ Add Recipe</Link>
      </div>

      <ul style={{ marginTop: 16 }}>
        {recipes.map((r) => {
          const id = r._id || r.id;
          const title = r.title || r.name || "Untitled recipe";
          return (
            <li key={id} style={{ marginBottom: 10 }}>
              <Link to={`/recipe/${id}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
