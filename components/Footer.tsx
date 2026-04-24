export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h3 className="font-serif text-lg mb-2">
          Dulces de Curacaví
        </h3>

        <p className="text-sm text-amber-200 mb-4">
          Tradición chilena en cada bocado
        </p>

        <p className="text-xs text-amber-300">
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}