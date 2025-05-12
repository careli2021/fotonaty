export function AppFooter() {
  return (
    <footer className="bg-muted/50 border-t py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EventSnap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
