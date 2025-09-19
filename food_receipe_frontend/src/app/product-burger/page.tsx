"use client";

/**
 * Product Burger page - converted from static HTML/CSS/JS.
 * Implements accessible, modular React components with CSS Modules and styled-jsx.
 * Route: /product-burger
 */

import Image from "next/image";
import Link from "next/link";
import styles from "./productBurger.module.css";
import { useEffect, useMemo, useState } from "react";

// Helper types based on typical static asset structure
type Ingredient = {
  id: string;
  name: string;
  amount?: string;
  checked?: boolean;
};
type Step = {
  id: string;
  text: string;
};
type Nutrition = {
  label: string;
  value: string;
  srOnlyLabel?: string;
};

const DEFAULT_INGREDIENTS: Ingredient[] = [
  { id: "ing-1", name: "Sesame Bun", amount: "2 halves", checked: false },
  { id: "ing-2", name: "Ground Beef Patty", amount: "1 (6 oz)", checked: false },
  { id: "ing-3", name: "Cheddar Cheese", amount: "1 slice", checked: false },
  { id: "ing-4", name: "Lettuce", amount: "2 leaves", checked: false },
  { id: "ing-5", name: "Tomato", amount: "2 slices", checked: false },
  { id: "ing-6", name: "Pickles", amount: "3-4 slices", checked: false },
  { id: "ing-7", name: "Onion", amount: "2 rings", checked: false },
  { id: "ing-8", name: "Burger Sauce", amount: "1 tbsp", checked: false },
  { id: "ing-9", name: "Salt & Pepper", amount: "to taste", checked: false },
];

const DEFAULT_STEPS: Step[] = [
  { id: "step-1", text: "Toast the sesame bun halves until lightly golden." },
  { id: "step-2", text: "Season beef patty with salt and pepper, then grill 3-4 minutes per side." },
  { id: "step-3", text: "Top with cheese in the last minute to melt." },
  { id: "step-4", text: "Spread burger sauce on bun, assemble with lettuce, tomato, pickles, and onion." },
  { id: "step-5", text: "Serve immediately while hot and enjoy." },
];

const DEFAULT_NUTRITION: Nutrition[] = [
  { label: "Calories", value: "560 kcal" },
  { label: "Protein", value: "28 g" },
  { label: "Carbs", value: "42 g" },
  { label: "Fat", value: "28 g" },
];

function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      /* no-op */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* no-op */
    }
  }, [key, value]);
  return [value, setValue] as const;
}



// PUBLIC_INTERFACE
export default function ProductBurgerPage() {
  /** Product Burger detail page */
  const [ingredients, setIngredients] = useLocalState<Ingredient[]>(
    "product-burger-ingredients",
    DEFAULT_INGREDIENTS
  );

  const checkedCount = useMemo(
    () => ingredients.filter((i) => i.checked).length,
    [ingredients]
  );

  const progress = Math.round((checkedCount / ingredients.length) * 100);

  const toggleIngredient = (id: string) => {
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id ? { ...ing, checked: !ing.checked } : ing
      )
    );
  };

  const resetList = () => setIngredients(DEFAULT_INGREDIENTS);

  return (
    <main className={styles.page} aria-labelledby="recipe-title">
      <Header />

      <article className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/assets/figma_image_114_413.png"
              alt="Product Burger with melted cheese, lettuce, tomato and sauce"
              fill
              className={styles.heroImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className={styles.heroContent}>
            <h1 id="recipe-title" className={styles.title}>
              Product Burger
            </h1>
            <p className={styles.subtitle}>
              A juicy, classic cheeseburger with a modern twist.
            </p>

            <ul className={styles.meta} aria-label="Recipe meta">
              <li>
                <span className={styles.metaLabel}>Prep</span>
                <span className={styles.metaValue}>10 min</span>
              </li>
              <li>
                <span className={styles.metaLabel}>Cook</span>
                <span className={styles.metaValue}>8 min</span>
              </li>
              <li>
                <span className={styles.metaLabel}>Serves</span>
                <span className={styles.metaValue}>1</span>
              </li>
            </ul>

            <div className={styles.ctaRow}>
              <button className={styles.primaryBtn} type="button" aria-label="Start cooking">
                Start Cooking
              </button>
              <button
                className={styles.secondaryBtn}
                type="button"
                aria-label="Reset checklist"
                onClick={resetList}
              >
                Reset Checklist
              </button>
            </div>
          </div>
        </section>

        <section className={styles.contentGrid} aria-label="Recipe details">
          <div className={styles.leftCol}>
            <Ingredients
              ingredients={ingredients}
              onToggle={toggleIngredient}
              progress={progress}
            />
            <NutritionFacts items={DEFAULT_NUTRITION} />
          </div>
          <div className={styles.rightCol}>
            <Steps steps={DEFAULT_STEPS} />
            <Tips />
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link className={styles.logo} href="/">
          <span className="sr-only">Back to home</span>
          <Image
            src="/assets/figma_image_6_2.png"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
          />
          <span className={styles.logoText}>Food Recipes</span>
        </Link>

        <div className={styles.navRight}>
          <Link href="/search" className={styles.navLink}>
            Search
          </Link>
          <Link href="/favorites" className={styles.navLink}>
            Favorites
          </Link>
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerRow}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Food Recipes. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
          <Link href="/privacy" className={styles.footerLink}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.footerLink}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Ingredients({
  ingredients,
  onToggle,
  progress,
}: {
  ingredients: Ingredient[];
  onToggle: (id: string) => void;
  progress: number;
}) {
  return (
    <section className={styles.card} aria-labelledby="ingredients-title">
      <div className={styles.cardHeader}>
        <h2 id="ingredients-title" className={styles.cardTitle}>
          Ingredients
        </h2>
        <div className={styles.progressWrap} aria-label="Ingredient progress">
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressLabel}>{progress}%</span>
        </div>
      </div>

      <ul className={styles.list} role="list">
        {ingredients.map((ing) => {
          const labelId = `${ing.id}-label`;
          return (
            <li key={ing.id} className={styles.listItem}>
              <label htmlFor={ing.id} id={labelId} className={styles.checkboxLabel}>
                <input
                  id={ing.id}
                  type="checkbox"
                  className={styles.checkbox}
                  checked={!!ing.checked}
                  onChange={() => onToggle(ing.id)}
                  aria-labelledby={labelId}
                />
                <span className={styles.itemText}>
                  <span className={styles.itemName}>{ing.name}</span>
                  {ing.amount ? (
                    <span className={styles.itemMeta}> • {ing.amount}</span>
                  ) : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Steps({ steps }: { steps: Step[] }) {
  return (
    <section className={styles.card} aria-labelledby="steps-title">
      <div className={styles.cardHeader}>
        <h2 id="steps-title" className={styles.cardTitle}>
          Steps
        </h2>
      </div>
      <ol className={styles.stepList}>
        {steps.map((s, i) => (
          <li key={s.id} className={styles.stepItem}>
            <div className={styles.stepBadge} aria-hidden="true">
              {i + 1}
            </div>
            <p className={styles.stepText}>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function NutritionFacts({ items }: { items: Nutrition[] }) {
  return (
    <section className={styles.card} aria-labelledby="nutrition-title">
      <div className={styles.cardHeader}>
        <h2 id="nutrition-title" className={styles.cardTitle}>
          Nutrition
        </h2>
      </div>
      <dl className={styles.nutritionGrid}>
        {items.map((n) => (
          <div key={n.label} className={styles.nutritionItem}>
            <dt className={styles.nutritionLabel}>{n.label}</dt>
            <dd className={styles.nutritionValue}>{n.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Tips() {
  return (
    <section className={styles.card} aria-labelledby="tips-title">
      <div className={styles.cardHeader}>
        <h2 id="tips-title" className={styles.cardTitle}>
          Chef Tips
        </h2>
      </div>
      <ul className={styles.list} role="list">
        <li className={styles.listItem}>
          For extra juiciness, let the patty rest for 2-3 minutes before assembling.
        </li>
        <li className={styles.listItem}>
          Lightly butter the buns before toasting for a richer flavor.
        </li>
        <li className={styles.listItem}>
          Use a mix of ketchup, mayo, and relish to make a simple burger sauce.
        </li>
      </ul>
    </section>
  );
}

/* styled-jsx for small utilities converted from common.css */
<style jsx global>{`
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
`}</style>
