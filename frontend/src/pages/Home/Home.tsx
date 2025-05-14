import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawPrintIcon } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterForm } from "@/auth/components/RegisterForm";
import { useState } from "react";

export default function Home() {
  const [message, setmessage] = useState<string | null>(null);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* MainSection */}
        <section className="w-full py-6 md:py-16 lg:py-20 xl:py-28 text-center md:text-left">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Cuida y registra a tu mascota con amor
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Ofrecemos un servicio completo de registro, seguimiento y
                    cuidado para tus mascotas. Mantén toda su información
                    organizada y accesible.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row itecems-center justify-center md:justify-start">
                  {/* signup */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">Registrate!</Button>
                    </DialogTrigger>
                    <DialogContent className="text-center">
                      <DialogHeader className="flex flex-col items-center">
                        <PawPrintIcon className="h-8 w-8 text-rose-500" />

                        <DialogTitle> Registrate </DialogTitle>
                        <DialogDescription>
                          Crea una cuenta para gestionar la salud de tu mascota.
                        </DialogDescription>
                      </DialogHeader>
                      <RegisterForm />
                      <DialogFooter className=" flex flex-col items-center justify-center"></DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <a href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Cómo Funciona
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <img
                  src="/assets/images/home_img.png"
                  alt="Perro y gato felices"
                  className="rounded-2xl object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section
          id="features"
          className="w-full py-6 md:py-12 lg:py-16 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <Paw className="mr-1 h-3.5 w-3.5 text-rose-500" />
                  Características
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Todo lo que tu mascota necesita
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma ofrece todo lo necesario para mantener a tu
                  mascota saludable y feliz.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Seguimiento de Salud</h3>
                  <p className="text-muted-foreground">
                    Mantén un registro de vacunas, visitas al veterinario y
                    medicamentos.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100">
                  <Shield className="h-6 w-6 text-rose-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Identificación Segura</h3>
                  <p className="text-muted-foreground">
                    Registro con chip y collar de identificación para mayor
                    seguridad.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100">
                  <Calendar className="h-6 w-6 text-rose-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Recordatorios</h3>
                  <p className="text-muted-foreground">
                    Notificaciones para vacunas, desparasitación y citas
                    veterinarias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Cómo Funciona
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  En solo tres sencillos pasos, tu mascota estará registrada y
                  protegida.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-900">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Registro</h3>
                  <p className="text-muted-foreground">
                    Completa el formulario con los datos de tu mascota y sube
                    una foto.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-900">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Verificación</h3>
                  <p className="text-muted-foreground">
                    Nuestro equipo verifica la información y prepara la
                    identificación.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-900">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Seguimiento</h3>
                  <p className="text-muted-foreground">
                    Accede a tu cuenta para gestionar toda la información de tu
                    mascota.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-8 md:py-16 lg:py-24 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Lo que dicen nuestros usuarios
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Miles de dueños de mascotas confían en nuestro servicio.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  {/* <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="Avatar"
                    className="rounded-full"
                  /> */}
                  <div>
                    <h3 className="text-lg font-bold">María García</h3>
                    <p className="text-sm text-muted-foreground">
                      Dueña de Max, un Labrador
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Desde que registré a Max en PetCare, me siento mucho más
                  tranquila. Los recordatorios de vacunas son muy útiles y su
                  identificación nos ha salvado en un par de ocasiones."
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  {/* <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="Avatar"
                    className="rounded-full"
                  /> */}
                  <div>
                    <h3 className="text-lg font-bold">Carlos Rodríguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Dueño de Luna, una gata Siamesa
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "El servicio es excelente. Tener toda la información médica de
                  Luna en un solo lugar me facilita mucho las visitas al
                  veterinario. Totalmente recomendado."
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* 
        <section id="register" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Registra a tu mascota hoy
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Completa el formulario y comienza a disfrutar de todos los
                    beneficios que ofrecemos para el cuidado de tu mascota.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500" />
                    <span>Registro oficial en base de datos nacional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500" />
                    <span>Collar de identificación personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500" />
                    <span>Acceso a plataforma de seguimiento de salud</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500" />
                    <span>Recordatorios de vacunas y citas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500" />
                    <span>Soporte 24/7 en caso de pérdida</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold">Formulario de Registro</h3>
                  <p className="text-muted-foreground">
                    Ingresa los datos de tu mascota
                  </p>
                </div>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="pet-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nombre de la mascota
                    </label>
                    <Input id="pet-name" placeholder="Ej: Max" />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="pet-type"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tipo de mascota
                    </label>
                    <select
                      id="pet-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="dog">Perro</option>
                      <option value="cat">Gato</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="pet-breed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Raza
                    </label>
                    <Input id="pet-breed" placeholder="Ej: Labrador" />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="pet-age"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Edad (años)
                    </label>
                    <Input id="pet-age" type="number" placeholder="Ej: 3" />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="owner-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nombre del dueño
                    </label>
                    <Input id="owner-name" placeholder="Nombre completo" />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="owner-email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input
                      id="owner-email"
                      type="email"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="owner-phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Teléfono
                    </label>
                    <Input id="owner-phone" placeholder="+34 600 000 000" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full  hover:bg-rose-600"
                  >
                    Registrar Mascota
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section> */}

        <section
          id="contact"
          className="w-full py-8 md:py-16 lg:py-24 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  ¿Tienes preguntas?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestro equipo está disponible para ayudarte con cualquier
                  duda sobre el registro y cuidado de tu mascota.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    className="max-w-lg"
                  />
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    resize-none
                    "
                    placeholder="Tu mensaje"
                  ></textarea>
                  <Button
                    type="submit"
                    className=" hover:bg-rose-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setmessage("Mensaje");
                    }}
                  >
                    {message ? "Mensaje enviado!" : "Enviar Mensaje"}
                  </Button>
                </form>
                {/* <p className="text-xs text-muted-foreground">
                  También puedes contactarnos directamente en{" "}
                  <a
                    href="mailto:info@petcare.com"
                    className="underline underline-offset-2"
                  >
                    info@petcare.com
                  </a>{" "}
                  o llamando al{" "}
                  <a
                    href="tel:+34600000000"
                    className="underline underline-offset-2"
                  >
                    +34 600 000 000
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
