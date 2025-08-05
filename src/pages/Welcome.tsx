import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowRight, Zap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <CheckSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button
                onClick={() => navigate("/login")}
                className="btn-primary"
              >
                Get Started
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-8 shadow-lg">
            <CheckSquare className="w-10 h-10 text-primary-foreground" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Task Management
            <span className="block text-primary">Simplified</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Focus on what matters with our minimalist task management solution.
            Clean, simple, and designed for productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="h-14 px-8 text-lg btn-primary"
            >
              Start Managing Tasks
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why TaskFlow?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with modern web technologies for a fast, reliable, and
            beautiful experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-card card-elevated">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Built with React and modern web standards for blazing-fast
              performance.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-card card-elevated">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-xl mb-4">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is protected with enterprise-grade security and privacy
              controls.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-card card-elevated">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Team Ready</h3>
            <p className="text-muted-foreground">
              Collaborate seamlessly with your team members and track progress
              together.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto bg-card card-elevated rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Organized?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of users who have already transformed their
            productivity with TaskFlow.
          </p>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="h-14 px-8 text-lg btn-primary"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <CheckSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              TaskFlow © 2024 - Built with React & Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Welcome;
