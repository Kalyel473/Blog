import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const newsletterSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const { toast } = useToast();
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: "",
      email: ""
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: NewsletterFormValues) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Assinatura concluída",
        description: "Você foi inscrito na nossa newsletter com sucesso!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro na assinatura",
        description: error.message || "Ocorreu um erro ao tentar assinar a newsletter.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    subscribeMutation.mutate(data);
  };

  return (
    <div id="newsletter" className="bg-secondary rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 font-sans">Newsletter de Segurança</h3>
        <p className="text-gray-300 mb-4">
          Receba alertas de segurança e nossos melhores artigos diretamente no seu email.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          {...field}
                          className="floating-label-input w-full bg-primary/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-accent text-white"
                          placeholder=" "
                        />
                        <label className="floating-label absolute top-3 left-3 text-gray-400 transition-transform duration-200 pointer-events-none">
                          Seu nome
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          {...field}
                          type="email"
                          className="floating-label-input w-full bg-primary/50 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-accent text-white"
                          placeholder=" "
                        />
                        <label className="floating-label absolute top-3 left-3 text-gray-400 transition-transform duration-200 pointer-events-none">
                          Seu email
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
              disabled={subscribeMutation.isPending}
            >
              {subscribeMutation.isPending ? 'Processando...' : 'Assinar Newsletter'}
            </Button>
          </form>
        </Form>
      </div>
      <div className="absolute -bottom-8 -right-8 opacity-10 text-8xl">
        <i className="fas fa-envelope-open-text"></i>
      </div>
    </div>
  );
};

export default Newsletter;
