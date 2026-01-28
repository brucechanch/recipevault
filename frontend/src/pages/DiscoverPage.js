import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeAPI } from "../api/client";

export default function DiscoverPage() {
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

        // 支援兩種回傳：array 或 { recipes: [...] }
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
        <h2>Discover</h2>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <h2>Discover</h2>
        <div style={{ background: "#ffe6e6", padding: 12, borderRadius: 10 }}>
          {error}
        </div>
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <h2>Discover</h2>
        <p>No recipes yet. Create one first.</p>
        <Link to="/add-recipe">+ Add Recipe</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Discover</h2>
        <Link to="/add-recipe">+ Add Recipe</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginTop: 16 }}>
        {recipes.map((r) => {
          const id = r._id || r.id;
          const title = r.title || r.name || "Untitled recipe";
          const desc = r.description || r.summary || "";

          return (
            <Link
              key={id}
              to={`/recipe/${id}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #eee",
                borderRadius: 14,
                background: "#fff",
                padding: 14,
              }}
            >
              <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
              <p style={{ margin: 0, opacity: 0.75, minHeight: 40 }}>
                {desc || "Open to view details"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
