import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl p-8">
        <h1 className="text-3xl font-semibold mb-2">Simple Food Recipes</h1>
        <p className="text-gray-600 mb-6">
          Explore recipes and cooking tips with a modern, clean interface.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/product-burger"
            className="rounded-xl border px-5 py-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1">Product Burger</h2>
            <p className="text-sm text-gray-500">
              View the converted Product Burger page.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
