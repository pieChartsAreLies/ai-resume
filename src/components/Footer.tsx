export default function Footer() {
  return (
    <footer className="py-8 border-t border-border grid-texture">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Michael Gerstl. From brisket to Bayesian inference, doing it all from Boca.
        </p>
        <a href="https://github.com/pieChartsAreLies" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/70 hover:text-primary transition-colors">
          pieChartsAreLies
        </a>
      </div>
    </footer>
  );
}
