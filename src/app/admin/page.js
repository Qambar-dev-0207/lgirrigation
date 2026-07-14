"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPortal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("stats"); // stats, products, gallery

  // Visitor analytics state
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Products state
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    title: "",
    standard: "",
    eyebrow: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    rangeSummary: "",
    pressureSummary: "",
    tags: "",
    features: "",
    rangeDetails: "",
    accessories: "",
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);
  const [productSuccessMsg, setProductSuccessMsg] = useState("");
  const [productErrorMsg, setProductErrorMsg] = useState("");

  // Editing state for Products
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingProductForm, setEditingProductForm] = useState(null);
  const [editingProductImageFile, setEditingProductImageFile] = useState(null);
  const [isUploadingEditProductImg, setIsUploadingEditProductImg] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    desc: "",
    tag: "FACILITY",
    alt: "",
    src: "",
  });
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [isUploadingGalleryImg, setIsUploadingGalleryImg] = useState(false);
  const [gallerySuccessMsg, setGallerySuccessMsg] = useState("");
  const [galleryErrorMsg, setGalleryErrorMsg] = useState("");

  // Editing state for Gallery
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingGalleryForm, setEditingGalleryForm] = useState(null);
  const [editingGalleryImageFile, setEditingGalleryImageFile] = useState(null);
  const [isUploadingEditGalleryImg, setIsUploadingEditGalleryImg] = useState(false);

  // Drag and Drop ordering state
  const [draggedProductIndex, setDraggedProductIndex] = useState(null);
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem("lg_admin_auth");
    return {
      "Authorization": `Basic ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      const res = await fetch("/api/visitors");
      if (res.ok) {
        const data = await res.json();
        setVisitorCount(data.count);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchGallery = async () => {
    setIsLoadingGallery(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  // Fetch token from localStorage
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
    const token = localStorage.getItem("lg_admin_auth");
    if (token) {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${token}`,
          "Content-Type": "application/json",
        }
      })
        .then((res) => {
          if (res.ok) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("lg_admin_auth");
          }
        })
        .catch(() => {
          localStorage.removeItem("lg_admin_auth");
        });
    }
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        fetchStats();
        fetchProducts();
        fetchGallery();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  // Drag and Drop Handlers
  const handleDragStart = (e, index, type) => {
    e.dataTransfer.effectAllowed = "move";
    if (type === "product") {
      setDraggedProductIndex(index);
    } else {
      setDraggedGalleryIndex(index);
    }
  };

  const handleDragOver = (e, index, type) => {
    e.preventDefault();
    if (type === "product") {
      if (draggedProductIndex === null || draggedProductIndex === index) return;
      const reordered = [...products];
      const draggedItem = reordered[draggedProductIndex];
      reordered.splice(draggedProductIndex, 1);
      reordered.splice(index, 0, draggedItem);
      setProducts(reordered);
      setDraggedProductIndex(index);
    } else {
      if (draggedGalleryIndex === null || draggedGalleryIndex === index) return;
      const reordered = [...galleryItems];
      const draggedItem = reordered[draggedGalleryIndex];
      reordered.splice(draggedGalleryIndex, 1);
      reordered.splice(index, 0, draggedItem);
      setGalleryItems(reordered);
      setDraggedGalleryIndex(index);
    }
  };

  const handleDragEnd = async (type) => {
    if (type === "product") {
      setDraggedProductIndex(null);
      await saveReorder(products, "product");
    } else {
      setDraggedGalleryIndex(null);
      await saveReorder(galleryItems, "gallery");
    }
  };

  const saveReorder = async (reorderedList, type) => {
    const url = type === "product" ? "/api/products" : "/api/gallery";
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(reorderedList),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Failed to save new order: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(`Save reorder error for ${type}:`, err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("lg_admin_auth", data.token);
        setIsLoggedIn(true);
        setLoginError("");
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setLoginError("An error occurred during authentication.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("lg_admin_auth");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };



  // Image Upload handler
  const handleImageUpload = async (file, type, isEditing = false) => {
    const isProduct = type === "product";
    if (isProduct) {
      if (isEditing) setIsUploadingEditProductImg(true);
      else setIsUploadingProductImg(true);
    } else {
      if (isEditing) setIsUploadingEditGalleryImg(true);
      else setIsUploadingGalleryImg(true);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("lg_admin_auth");
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (isProduct) {
          if (isEditing) {
            setEditingProductForm((prev) => ({ ...prev, image: data.url }));
          } else {
            setProductForm((prev) => ({ ...prev, image: data.url }));
          }
        } else {
          if (isEditing) {
            setEditingGalleryForm((prev) => ({ ...prev, src: data.url }));
          } else {
            setGalleryForm((prev) => ({ ...prev, src: data.url }));
          }
        }
      } else {
        const errData = await res.json();
        alert(`Upload failed: ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during file upload.");
    } finally {
      if (isProduct) {
        if (isEditing) setIsUploadingEditProductImg(false);
        else setIsUploadingProductImg(false);
      } else {
        if (isEditing) setIsUploadingEditGalleryImg(false);
        else setIsUploadingGalleryImg(false);
      }
    }
  };

  // Product Actions
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setProductErrorMsg("");
    setProductSuccessMsg("");

    if (!productForm.title || !productForm.shortDescription) {
      setProductErrorMsg("Title and Short Description are required.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(productForm),
      });

      if (res.ok) {
        setProductSuccessMsg("Product added successfully!");
        setProductForm({
          title: "",
          standard: "",
          eyebrow: "",
          shortDescription: "",
          longDescription: "",
          image: "",
          rangeSummary: "",
          pressureSummary: "",
          tags: "",
          features: "",
          rangeDetails: "",
          accessories: "",
        });
        setProductImageFile(null);
        setIsAddingProduct(false);
        fetchProducts();
      } else {
        const errData = await res.json();
        setProductErrorMsg(errData.error || "Failed to add product");
      }
    } catch (err) {
      setProductErrorMsg("An error occurred while adding the product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to remove this product?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (res.ok) {
        fetchProducts();
      } else {
        const errData = await res.json();
        alert(`Delete failed: ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setEditingProductForm({
      id: prod.id,
      title: prod.title || "",
      standard: prod.standard || "",
      eyebrow: prod.eyebrow || "",
      shortDescription: prod.shortDescription || "",
      longDescription: prod.longDescription || "",
      image: prod.image || "",
      rangeSummary: prod.rangeSummary || "",
      pressureSummary: prod.pressureSummary || "",
      tags: Array.isArray(prod.tags) ? prod.tags.join(", ") : (prod.tags || ""),
      features: Array.isArray(prod.features) ? prod.features.join("\n") : (prod.features || ""),
      rangeDetails: prod.rangeDetails || "",
      accessories: Array.isArray(prod.accessories) ? prod.accessories.join("\n") : (prod.accessories || ""),
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setProductErrorMsg("");
    setProductSuccessMsg("");

    if (!editingProductForm.title || !editingProductForm.shortDescription) {
      alert("Title and Short Description are required.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(editingProductForm),
      });

      if (res.ok) {
        setProductSuccessMsg("Product updated successfully!");
        setEditingProduct(null);
        setEditingProductForm(null);
        setEditingProductImageFile(null);
        fetchProducts();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update product");
      }
    } catch (err) {
      console.error("Update product error:", err);
      alert("An error occurred while updating the product.");
    }
  };

  // Gallery Actions
  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    setGalleryErrorMsg("");
    setGallerySuccessMsg("");

    if (!galleryForm.title || !galleryForm.src) {
      setGalleryErrorMsg("Title and Image (Upload or URL) are required.");
      return;
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(galleryForm),
      });

      if (res.ok) {
        setGallerySuccessMsg("Gallery item added successfully!");
        setGalleryForm({
          title: "",
          desc: "",
          tag: "FACILITY",
          alt: "",
          src: "",
        });
        setGalleryImageFile(null);
        setIsAddingGallery(false);
        fetchGallery();
      } else {
        const errData = await res.json();
        setGalleryErrorMsg(errData.error || "Failed to add gallery item");
      }
    } catch (err) {
      setGalleryErrorMsg("An error occurred while adding the gallery item.");
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!confirm("Are you sure you want to remove this image from the gallery?")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (res.ok) {
        fetchGallery();
      } else {
        const errData = await res.json();
        alert(`Delete failed: ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete gallery item error:", err);
    }
  };

  const startEditGallery = (item) => {
    setEditingGallery(item);
    setEditingGalleryForm({
      id: item.id,
      title: item.title || "",
      tag: item.tag || "FACILITY",
      desc: item.desc || "",
      src: item.src || "",
      alt: item.alt || "",
    });
  };

  const handleUpdateGalleryItem = async (e) => {
    e.preventDefault();
    setGalleryErrorMsg("");
    setGallerySuccessMsg("");

    if (!editingGalleryForm.title || !editingGalleryForm.src) {
      alert("Title and Image (Upload or URL) are required.");
      return;
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(editingGalleryForm),
      });

      if (res.ok) {
        setGallerySuccessMsg("Gallery item updated successfully!");
        setEditingGallery(null);
        setEditingGalleryForm(null);
        setEditingGalleryImageFile(null);
        fetchGallery();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update gallery item");
      }
    } catch (err) {
      console.error("Update gallery item error:", err);
      alert("An error occurred while updating the gallery item.");
    }
  };

  if (!isMounted) return null;

  // Render Login screen
  if (!isLoggedIn) {
    return (
      <main style={{ marginTop: "120px", marginBottom: "80px" }}>
        <div className="container" style={{ maxWidth: "480px" }}>
          <div
            style={{
              backgroundColor: "var(--lifted-cream)",
              padding: "var(--space-4)",
              borderRadius: "20px",
              boxShadow: "var(--shadow-level-2)",
              border: "1px solid rgba(20, 20, 19, 0.08)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "var(--space-3)" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(207, 69, 0, 0.1)",
                  color: "var(--signal-orange)",
                  marginBottom: "16px",
                }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--ink-black)" }}>Admin Portal</h2>
              <p style={{ color: "var(--slate-gray)", fontSize: "0.875rem", marginTop: "4px" }}>
                Secure access for L G Irrigation site managers.
              </p>
            </div>

            {loginError && (
              <div
                style={{
                  backgroundColor: "rgba(207, 69, 0, 0.08)",
                  border: "1px solid var(--signal-orange)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "var(--signal-orange)",
                  fontSize: "0.875rem",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--charcoal)",
                    marginBottom: "6px",
                  }}
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid rgba(20, 20, 19, 0.15)",
                    backgroundColor: "var(--white)",
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.9375rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--charcoal)",
                    marginBottom: "6px",
                  }}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid rgba(20, 20, 19, 0.15)",
                    backgroundColor: "var(--white)",
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.9375rem",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "14px 20px" }}
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Render Logged In Dashboard
  return (
    <main style={{ marginTop: "120px", marginBottom: "80px" }}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            borderBottom: "1px solid rgba(20, 20, 19, 0.08)",
            paddingBottom: "24px",
            marginBottom: "32px",
          }}
        >
          <div>
            <span className="eyebrow" style={{ marginBottom: "4px" }}>CONTROL CENTER</span>
            <h1 style={{ margin: 0, fontSize: "2.25rem" }}>LGI Site Administration</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ borderRadius: "var(--radius-btn)", padding: "8px 20px", fontSize: "0.875rem" }}
          >
            Log Out
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1.5px solid rgba(20, 20, 19, 0.06)",
            marginBottom: "32px",
            paddingBottom: "1px",
          }}
        >
          <button
            onClick={() => setActiveTab("stats")}
            style={{
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: "0.9375rem",
              fontFamily: "var(--font-primary)",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: activeTab === "stats" ? "var(--signal-orange)" : "var(--slate-gray)",
              borderBottom: activeTab === "stats" ? "2.5px solid var(--signal-orange)" : "2.5px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Analytics &amp; Stats
          </button>
          <button
            onClick={() => setActiveTab("products")}
            style={{
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: "0.9375rem",
              fontFamily: "var(--font-primary)",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: activeTab === "products" ? "var(--signal-orange)" : "var(--slate-gray)",
              borderBottom: activeTab === "products" ? "2.5px solid var(--signal-orange)" : "2.5px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            style={{
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: "0.9375rem",
              fontFamily: "var(--font-primary)",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: activeTab === "gallery" ? "var(--signal-orange)" : "var(--slate-gray)",
              borderBottom: activeTab === "gallery" ? "2.5px solid var(--signal-orange)" : "2.5px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Gallery ({galleryItems.length})
          </button>
        </div>

        {/* TAB 1: ANALYTICS & STATS */}
        {activeTab === "stats" && (
          <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            <div
              style={{
                backgroundColor: "var(--lifted-cream)",
                padding: "32px",
                borderRadius: "20px",
                border: "1px solid rgba(20, 20, 19, 0.08)",
                boxShadow: "var(--shadow-level-1)",
                maxWidth: "600px",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink-black)", marginBottom: "16px" }}>
                Website Traffic Analytics
              </h3>
              
              {isLoadingStats ? (
                <p style={{ color: "var(--slate-gray)" }}>Loading traffic data...</p>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(207, 69, 0, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--signal-orange)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--ink-black)", lineHeight: 1 }}>
                      {visitorCount !== null ? visitorCount : "—"}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--slate-gray)", marginTop: "4px" }}>
                      Unique Session Visitors
                    </div>
                  </div>
                </div>
              )}

              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(20, 20, 19, 0.08)",
                  fontSize: "0.875rem",
                  color: "var(--slate-gray)",
                  lineHeight: 1.5,
                }}
              >
                <strong>How it works:</strong> Page hits are recorded client-side on layout loading. To prevent counting browser refreshes and sub-page navigations, the site uses standard session tracking.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            
            {/* Header / Add Toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Catalog Products</h3>
              <button
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-btn)", padding: "10px 20px" }}
              >
                {isAddingProduct ? "Cancel Form" : "Add New Product"}
              </button>
            </div>

            {/* Success/Error Alerts */}
            {productSuccessMsg && (
              <div style={{ backgroundColor: "rgba(56, 96, 190, 0.1)", border: "1px solid var(--link-blue)", color: "var(--link-blue)", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
                {productSuccessMsg}
              </div>
            )}
            {productErrorMsg && (
              <div style={{ backgroundColor: "rgba(207, 69, 0, 0.1)", border: "1px solid var(--signal-orange)", color: "var(--signal-orange)", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
                {productErrorMsg}
              </div>
            )}

            {/* Add Product Form */}
            {isAddingProduct && (
              <div
                style={{
                  backgroundColor: "var(--lifted-cream)",
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid rgba(20, 20, 19, 0.08)",
                  marginBottom: "32px",
                  boxShadow: "var(--shadow-level-1)",
                }}
              >
                <h4 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "20px", color: "var(--signal-orange)" }}>
                  Add Product Entry
                </h4>
                <form onSubmit={handleAddProduct}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Title *</label>
                      <input
                        type="text"
                        required
                        value={productForm.title}
                        onChange={(e) => setProductForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="e.g., PVC Pipe Extra"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Standard License</label>
                      <input
                        type="text"
                        value={productForm.standard}
                        onChange={(e) => setProductForm((p) => ({ ...p, standard: e.target.value }))}
                        placeholder="e.g., IS 4984 : 1995"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Eyebrow Header</label>
                      <input
                        type="text"
                        value={productForm.eyebrow}
                        onChange={(e) => setProductForm((p) => ({ ...p, eyebrow: e.target.value }))}
                        placeholder="e.g., HIGH RESISTANCE WATER"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={productForm.tags}
                        onChange={(e) => setProductForm((p) => ({ ...p, tags: e.target.value }))}
                        placeholder="e.g., POTABLE WATER, ACID RESISTANT, DURABLE"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Short Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={productForm.shortDescription}
                      onChange={(e) => setProductForm((p) => ({ ...p, shortDescription: e.target.value }))}
                      placeholder="Brief text used on cards..."
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Long Detailed Description</label>
                    <textarea
                      rows={4}
                      value={productForm.longDescription}
                      onChange={(e) => setProductForm((p) => ({ ...p, longDescription: e.target.value }))}
                      placeholder="Comprehensive overview displayed in catalog details modal..."
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Diameter/Size Range Summary</label>
                      <input
                        type="text"
                        value={productForm.rangeSummary}
                        onChange={(e) => setProductForm((p) => ({ ...p, rangeSummary: e.target.value }))}
                        placeholder="e.g., 32mm – 500mm"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Pressure Rating Summary</label>
                      <input
                        type="text"
                        value={productForm.pressureSummary}
                        onChange={(e) => setProductForm((p) => ({ ...p, pressureSummary: e.target.value }))}
                        placeholder="e.g., PN 2.5 – PN 10"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Supply details / Bar &amp; Coil Info</label>
                      <input
                        type="text"
                        value={productForm.rangeDetails}
                        onChange={(e) => setProductForm((p) => ({ ...p, rangeDetails: e.target.value }))}
                        placeholder="e.g., Supplied in coils of 100 meters..."
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Image (Upload local file)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setProductImageFile(file);
                            handleImageUpload(file, "product");
                          }
                        }}
                        style={{ marginBottom: "8px" }}
                      />
                      {isUploadingProductImg && <span style={{ fontSize: "0.75rem", color: "var(--link-blue)" }}>Uploading file...</span>}
                      {productForm.image && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)" }}>URL: {productForm.image}</span>
                          <img src={productForm.image} alt="Preview" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Features / Applications (one per line)</label>
                      <textarea
                        rows={3}
                        value={productForm.features}
                        onChange={(e) => setProductForm((p) => ({ ...p, features: e.target.value }))}
                        placeholder="e.g., Highly resistant to corrosion&#10;Inert to farm chemicals&#10;Easy to install"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Accessories (one per line, for Sprinklers)</label>
                      <textarea
                        rows={3}
                        value={productForm.accessories}
                        onChange={(e) => setProductForm((p) => ({ ...p, accessories: e.target.value }))}
                        placeholder="e.g., Pump Connector&#10;Foot Button&#10;Sprinkler Nozzle"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: "12px 24px" }}>
                    Create Product Entry
                  </button>
                </form>
              </div>
            )}

            {/* Products Table/List */}
            {isLoadingProducts ? (
              <p style={{ color: "var(--slate-gray)" }}>Loading products...</p>
            ) : products.length === 0 ? (
              <p style={{ color: "var(--slate-gray)" }}>No products found. Add one above.</p>
            ) : (
              <div
                style={{
                  backgroundColor: "var(--lifted-cream)",
                  borderRadius: "20px",
                  border: "1px solid rgba(20, 20, 19, 0.08)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-level-1)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9375rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "1.5px solid rgba(20, 20, 19, 0.08)", backgroundColor: "rgba(20, 20, 19, 0.02)" }}>
                        <th style={{ width: "40px", padding: "16px 24px" }}></th>
                        <th style={{ padding: "16px 24px", fontWeight: 700 }}>Image</th>
                        <th style={{ padding: "16px 24px", fontWeight: 700 }}>Product Title</th>
                        <th style={{ padding: "16px 24px", fontWeight: 700 }}>Standard</th>
                        <th style={{ padding: "16px 24px", fontWeight: 700 }}>Range / pressure</th>
                        <th style={{ padding: "16px 24px", fontWeight: 700, textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod, index) => (
                        <tr 
                          key={prod.id} 
                          draggable
                          onDragStart={(e) => handleDragStart(e, index, "product")}
                          onDragOver={(e) => handleDragOver(e, index, "product")}
                          onDragEnd={() => handleDragEnd("product")}
                          style={{ 
                            borderBottom: "1px solid rgba(20, 20, 19, 0.06)",
                            opacity: draggedProductIndex === index ? 0.4 : 1,
                            transition: "opacity 0.15s ease",
                            cursor: "grab",
                          }}
                        >
                          <td style={{ width: "40px", padding: "16px 24px", color: "var(--slate-gray)", cursor: "grab" }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                              <path d="M9 3h2v2H9V3zm4 0h2v2h-2V3zm-4 4h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" />
                            </svg>
                          </td>
                          <td style={{ padding: "16px 24px" }}>
                            <img
                              src={prod.image}
                              alt={prod.title}
                              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.08)" }}
                            />
                          </td>
                          <td style={{ padding: "16px 24px", fontWeight: 700 }}>{prod.title}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ fontSize: "0.8125rem", padding: "4px 8px", backgroundColor: "rgba(20, 20, 19, 0.05)", borderRadius: "4px", fontWeight: 500 }}>
                              {prod.standard || "N/A"}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px", color: "var(--slate-gray)", fontSize: "0.875rem" }}>
                            {prod.rangeSummary || "—"} / {prod.pressureSummary || "—"}
                          </td>
                          <td style={{ padding: "16px 24px", textAlign: "right" }}>
                            <button
                              onClick={() => startEditProduct(prod)}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                color: "#3860BE",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                backgroundColor: "rgba(56, 96, 190, 0.05)",
                                transition: "all 0.15s ease",
                                marginRight: "8px",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(56, 96, 190, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "rgba(56, 96, 190, 0.05)";
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                color: "var(--signal-orange)",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                backgroundColor: "rgba(207, 69, 0, 0.05)",
                                transition: "all 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(207, 69, 0, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "rgba(207, 69, 0, 0.05)";
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GALLERY MANAGEMENT */}
        {activeTab === "gallery" && (
          <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            
            {/* Header / Add Toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Gallery Images</h3>
              <button
                onClick={() => setIsAddingGallery(!isAddingGallery)}
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-btn)", padding: "10px 20px" }}
              >
                {isAddingGallery ? "Cancel Form" : "Add Image"}
              </button>
            </div>

            {/* Success/Error Alerts */}
            {gallerySuccessMsg && (
              <div style={{ backgroundColor: "rgba(56, 96, 190, 0.1)", border: "1px solid var(--link-blue)", color: "var(--link-blue)", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
                {gallerySuccessMsg}
              </div>
            )}
            {galleryErrorMsg && (
              <div style={{ backgroundColor: "rgba(207, 69, 0, 0.1)", border: "1px solid var(--signal-orange)", color: "var(--signal-orange)", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
                {galleryErrorMsg}
              </div>
            )}

            {/* Add Gallery Form */}
            {isAddingGallery && (
              <div
                style={{
                  backgroundColor: "var(--lifted-cream)",
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid rgba(20, 20, 19, 0.08)",
                  marginBottom: "32px",
                  boxShadow: "var(--shadow-level-1)",
                }}
              >
                <h4 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "20px", color: "var(--signal-orange)" }}>
                  Upload Gallery Item
                </h4>
                <form onSubmit={handleAddGalleryItem}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Title *</label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm((g) => ({ ...g, title: e.target.value }))}
                        placeholder="e.g., Quality Lab Tester"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Category Tag</label>
                      <select
                        value={galleryForm.tag}
                        onChange={(e) => setGalleryForm((g) => ({ ...g, tag: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", backgroundColor: "var(--white)", height: "42px" }}
                      >
                        <option value="FACILITY">Facility</option>
                        <option value="CORPORATE">Corporate</option>
                        <option value="R&D">R&D / Lab</option>
                        <option value="PROJECT">Project Site</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Description</label>
                    <textarea
                      rows={2}
                      value={galleryForm.desc}
                      onChange={(e) => setGalleryForm((g) => ({ ...g, desc: e.target.value }))}
                      placeholder="Brief description of the image..."
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Image (Upload local file) *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setGalleryImageFile(file);
                            handleImageUpload(file, "gallery");
                          }
                        }}
                        style={{ marginBottom: "8px" }}
                      />
                      {isUploadingGalleryImg && <span style={{ fontSize: "0.75rem", color: "var(--link-blue)" }}>Uploading file...</span>}
                      {galleryForm.src && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)" }}>URL: {galleryForm.src}</span>
                          <img src={galleryForm.src} alt="Preview" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Alt text (defaults to Title)</label>
                      <input
                        type="text"
                        value={galleryForm.alt}
                        onChange={(e) => setGalleryForm((g) => ({ ...g, alt: e.target.value }))}
                        placeholder="Image accessibility text..."
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: "12px 24px" }}>
                    Upload and Add to Gallery
                  </button>
                </form>
              </div>
            )}

            {/* Gallery Grid */}
            {isLoadingGallery ? (
              <p style={{ color: "var(--slate-gray)" }}>Loading gallery...</p>
            ) : galleryItems.length === 0 ? (
              <p style={{ color: "var(--slate-gray)" }}>No gallery items found. Add one above.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {galleryItems.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, "gallery")}
                    onDragOver={(e) => handleDragOver(e, index, "gallery")}
                    onDragEnd={() => handleDragEnd("gallery")}
                    style={{
                      backgroundColor: "var(--lifted-cream)",
                      borderRadius: "16px",
                      border: draggedGalleryIndex === index ? "1.5px dashed var(--signal-orange)" : "1px solid rgba(20, 20, 19, 0.08)",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-level-1)",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "grab",
                      opacity: draggedGalleryIndex === index ? 0.4 : 1,
                      transition: "opacity 0.15s ease, border-color 0.15s ease",
                    }}
                  >
                    <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                      <img
                        src={item.src}
                        alt={item.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          backgroundColor: "var(--ink-black)",
                          color: "var(--white)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {item.tag}
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "rgba(252, 251, 250, 0.9)",
                          color: "var(--ink-black)",
                          padding: "6px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          cursor: "grab",
                        }}
                        title="Drag to reorder"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                          <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </span>
                    </div>
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink-black)", marginBottom: "4px" }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: "0.8125rem", color: "var(--slate-gray)", lineHeight: 1.4, marginBottom: "16px" }}>
                          {item.desc || "No description provided."}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                        <button
                          onClick={() => startEditGallery(item)}
                          style={{
                            flex: 1,
                            border: "1px solid #3860BE",
                            backgroundColor: "transparent",
                            color: "#3860BE",
                            fontWeight: 700,
                            fontSize: "0.8125rem",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#3860BE";
                            e.target.style.color = "var(--white)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#3860BE";
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          style={{
                            flex: 1,
                            border: "1px solid var(--signal-orange)",
                            backgroundColor: "transparent",
                            color: "var(--signal-orange)",
                            fontWeight: 700,
                            fontSize: "0.8125rem",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "var(--signal-orange)";
                            e.target.style.color = "var(--white)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "var(--signal-orange)";
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Product Edit Modal */}
      {editingProduct && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
        }}>
          <div style={{
            backgroundColor: "#FCFAF9",
            width: "100%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            border: "1px solid rgba(20, 20, 19, 0.08)",
            position: "relative",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid rgba(20, 20, 19, 0.08)", paddingBottom: "16px" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, color: "var(--ink-black)" }}>Edit Product</h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setEditingProductForm(null);
                  setEditingProductImageFile(null);
                }}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--slate-gray)",
                  fontWeight: 700,
                }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateProduct}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProductForm.title}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g., PVC Pipe Extra"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Standard License</label>
                  <input
                    type="text"
                    value={editingProductForm.standard}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, standard: e.target.value }))}
                    placeholder="e.g., IS 4984 : 1995"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Eyebrow Header</label>
                  <input
                    type="text"
                    value={editingProductForm.eyebrow}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, eyebrow: e.target.value }))}
                    placeholder="e.g., HIGH RESISTANCE WATER"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editingProductForm.tags}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, tags: e.target.value }))}
                    placeholder="e.g., POTABLE WATER, ACID RESISTANT"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={editingProductForm.shortDescription}
                  onChange={(e) => setEditingProductForm((p) => ({ ...p, shortDescription: e.target.value }))}
                  placeholder="Brief text used on cards..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Long Detailed Description</label>
                <textarea
                  rows={4}
                  value={editingProductForm.longDescription}
                  onChange={(e) => setEditingProductForm((p) => ({ ...p, longDescription: e.target.value }))}
                  placeholder="Detailed description..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Diameter/Size Range Summary</label>
                  <input
                    type="text"
                    value={editingProductForm.rangeSummary}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, rangeSummary: e.target.value }))}
                    placeholder="e.g., 32mm – 500mm"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Pressure Rating Summary</label>
                  <input
                    type="text"
                    value={editingProductForm.pressureSummary}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, pressureSummary: e.target.value }))}
                    placeholder="e.g., PN 2.5 – PN 10"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Supply details / Bar &amp; Coil Info</label>
                  <input
                    type="text"
                    value={editingProductForm.rangeDetails}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, rangeDetails: e.target.value }))}
                    placeholder="e.g., Supplied in coils of 100 meters..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Image (Upload local file to update)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEditingProductImageFile(file);
                        handleImageUpload(file, "product", true);
                      }
                    }}
                    style={{ marginBottom: "8px" }}
                  />
                  {isUploadingEditProductImg && <span style={{ display: "block", fontSize: "0.75rem", color: "var(--link-blue)" }}>Uploading file...</span>}
                  {editingProductForm.image && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" }}>URL: {editingProductForm.image.substring(0, 40)}...</span>
                      <img src={editingProductForm.image} alt="Preview" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Features / Applications (one per line)</label>
                  <textarea
                    rows={3}
                    value={editingProductForm.features}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, features: e.target.value }))}
                    placeholder="Features..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Accessories (one per line)</label>
                  <textarea
                    rows={3}
                    value={editingProductForm.accessories}
                    onChange={(e) => setEditingProductForm((p) => ({ ...p, accessories: e.target.value }))}
                    placeholder="Accessories..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid rgba(20, 20, 19, 0.08)", paddingTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingProduct(null);
                    setEditingProductForm(null);
                    setEditingProductImageFile(null);
                  }}
                  style={{ padding: "10px 20px" }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px" }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Edit Modal */}
      {editingGallery && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
        }}>
          <div style={{
            backgroundColor: "#FCFAF9",
            width: "100%",
            maxWidth: "550px",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            border: "1px solid rgba(20, 20, 19, 0.08)",
            position: "relative",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid rgba(20, 20, 19, 0.08)", paddingBottom: "16px" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, color: "var(--ink-black)" }}>Edit Gallery Image</h3>
              <button
                onClick={() => {
                  setEditingGallery(null);
                  setEditingGalleryForm(null);
                  setEditingGalleryImageFile(null);
                }}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--slate-gray)",
                  fontWeight: 700,
                }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateGalleryItem}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Title *</label>
                  <input
                    type="text"
                    required
                    value={editingGalleryForm.title}
                    onChange={(e) => setEditingGalleryForm((g) => ({ ...g, title: e.target.value }))}
                    placeholder="e.g., Quality Lab Tester"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Category Tag</label>
                  <select
                    value={editingGalleryForm.tag}
                    onChange={(e) => setEditingGalleryForm((g) => ({ ...g, tag: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", backgroundColor: "var(--white)", height: "42px" }}
                  >
                    <option value="FACILITY">Facility</option>
                    <option value="CORPORATE">Corporate</option>
                    <option value="R&D">R&D / Lab</option>
                    <option value="PROJECT">Project Site</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Description</label>
                <textarea
                  rows={2}
                  value={editingGalleryForm.desc}
                  onChange={(e) => setEditingGalleryForm((g) => ({ ...g, desc: e.target.value }))}
                  placeholder="Brief description of the image..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)", fontFamily: "var(--font-primary)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Image (Upload local file to update)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEditingGalleryImageFile(file);
                        handleImageUpload(file, "gallery", true);
                      }
                    }}
                    style={{ marginBottom: "8px" }}
                  />
                  {isUploadingEditGalleryImg && <span style={{ display: "block", fontSize: "0.75rem", color: "var(--link-blue)" }}>Uploading file...</span>}
                  {editingGalleryForm.src && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>URL: {editingGalleryForm.src.substring(0, 30)}...</span>
                      <img src={editingGalleryForm.src} alt="Preview" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>Alt text</label>
                  <input
                    type="text"
                    value={editingGalleryForm.alt}
                    onChange={(e) => setEditingGalleryForm((g) => ({ ...g, alt: e.target.value }))}
                    placeholder="Image accessibility text..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(20, 20, 19, 0.15)" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid rgba(20, 20, 19, 0.08)", paddingTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingGallery(null);
                    setEditingGalleryForm(null);
                    setEditingGalleryImageFile(null);
                  }}
                  style={{ padding: "10px 20px" }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px" }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
