import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido" }),
});

type FormValues = z.infer<typeof formSchema>;

type NewsletterFormProps = {
  id: string;
  variant?: "sidebar" | "footer" | "cta";
};

const NewsletterForm = ({ id, variant = "sidebar" }: NewsletterFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/subscribe", data);
      toast({
        title: "Inscrição confirmada!",
        description: "Você receberá nossas atualizações em breve.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro ao processar sua inscrição";
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Seu email"
                  className={`w-full ${
                    variant === "cta" 
                      ? "bg-white/20 text-white placeholder-gray-300 border-white/30 focus:bg-white/25 focus:border-white" 
                      : "bg-muted"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className={`w-full ${
            variant === "cta" 
              ? "bg-white text-primary hover:bg-gray-200" 
              : variant === "footer" 
                ? "bg-primary hover:bg-primary/90" 
                : "bg-accent-green hover:bg-accent-green/90"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Inscrever-se"}
        </Button>
        
        <p className="text-xs text-muted-foreground mt-3">
          Não enviamos spam. Você pode cancelar a qualquer momento.
        </p>
      </form>
    </Form>
  );
};

export default NewsletterForm;
