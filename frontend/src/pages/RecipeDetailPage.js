import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { recipeAPI } from "../api/client";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await recipeAPI.getById(id);
        const data = res?.data;

        if (!mounted) return;
        setRecipe(data?.recipe || data);
      } catch (e) {
        const status = e?.response?.status;
        if (status === 404) setError("Recipe not found");
        else setError(e?.response?.data?.error || e?.message || "Failed to load recipe");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const onDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      setDeleting(true);
      await recipeAPI.delete(id);
      navigate("/my-recipes");
    } catch (e) {
      alert(e?.response?.data?.error || e?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <Link to="/discover">← Back</Link>
        <div style={{ marginTop: 12, background: "#ffe6e6", padding: 12, borderRadius: 10 }}>
          {error}
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
        <Link to="/discover">← Back</Link>
        <p style={{ marginTop: 12 }}>No recipe data.</p>
      </div>
    );
  }

  const title = recipe.title || recipe.name || "Untitled recipe";
  const desc = recipe.description || recipe.summary || "";
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];

  return (
    <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <Link to="/discover">← Back</Link>
        <button
          onClick={onDelete}
          disabled={deleting}
          style={{ background: "#ff4d4f", color: "#fff", border: 0, padding: "10px 12px", borderRadius: 10 }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      <h1 style={{ marginTop: 16 }}>{title}</h1>
      {desc ? <p style={{ opacity: 0.85 }}>{desc}</p> : null}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 14, background: "#fff", padding: 14 }}>
          <h3 style={{ marginTop: 0 }}>Ingredients</h3>
          {ingredients.length ? (
            <ul>
              {ingredients.map((x, i) => (
                <li key={i}>{typeof x === "string" ? x : (x?.name || JSON.stringify(x))}</li>
              ))}
            </ul>
          ) : (
            <p style={{ opacity: 0.7 }}>No ingredients.</p>
          )}
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 14, background: "#fff", padding: 14 }}>
          <h3 style={{ marginTop: 0 }}>Steps</h3>
          {steps.length ? (
            <ol>
              {steps.map((x, i) => (
                <li key={i}>{typeof x === "string" ? x : (x?.text || JSON.stringify(x))}</li>
              ))}
            </ol>
          ) : (
            <p style={{ opacity: 0.7 }}>No steps.</p>
          )}
        </div>
      </div>
    </div>
  );
}
