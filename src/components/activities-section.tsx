"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarIcon, Clock, Users, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

// Activity data
const activities = [
  {
    id: 1,
    title: "TOUR DE LA MÉDINA",
    description:
      "Découvrez les trésors cachés de la Médina de Tunis lors d'une visite guidée à travers ses ruelles historiques, ses souks animés et ses monuments emblématiques.",
    shortDescription:
      "Une promenade guidée à travers l'histoire et la culture de la Médina de Tunis.",
    image: "/placeholder.svg?height=600&width=800&text=Tour+de+la+Medina",
    duration: "3 heures",
    maxParticipants: 12,
    price: "45 DT",
    location: "Porte Bab Bhar (Porte de France)",
    highlights: [
      "Visite des principaux monuments historiques",
      "Découverte des souks traditionnels",
      "Dégustation de spécialités locales",
      "Explications historiques et culturelles",
    ],
  },
  {
    id: 2,
    title: "CHASSE AU TRÉSOR",
    description:
      "Une aventure ludique et éducative pour toute la famille. Suivez les indices, résolvez les énigmes et découvrez l'histoire fascinante de la Médina tout en vous amusant.",
    shortDescription:
      "Une aventure interactive pour découvrir les secrets de la Médina en s'amusant.",
    image: "/placeholder.svg?height=600&width=800&text=Chasse+au+Tresor",
    duration: "2 heures",
    maxParticipants: 20,
    price: "35 DT",
    location: "Place de la Kasbah",
    highlights: [
      "Parcours d'énigmes adaptés à tous les âges",
      "Découverte ludique du patrimoine",
      "Activité idéale en famille",
      "Récompense pour les gagnants",
    ],
  },
  {
    id: 3,
    title: "RENCONTRES ET ATELIERS AVEC LES ARTISANS LOCAUX",
    description:
      "Immergez-vous dans le savoir-faire traditionnel tunisien en rencontrant des artisans passionnés. Participez à des ateliers pratiques et repartez avec votre création personnelle.",
    shortDescription:
      "Une immersion dans le savoir-faire traditionnel avec des artisans passionnés.",
    image: "/placeholder.svg?height=600&width=800&text=Ateliers+Artisans",
    duration: "4 heures",
    maxParticipants: 8,
    price: "60 DT",
    location: "Souk des Artisans",
    highlights: [
      "Rencontre avec des maîtres artisans",
      "Atelier pratique de création",
      "Découverte des techniques traditionnelles",
      "Création personnalisée à emporter",
    ],
  },
];

export function ActivitiesSection() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookNow = (activity: any) => {
    setSelectedActivity(activity);
    setIsBookingOpen(true);
    setBookingStep(1);
    setIsSuccess(false);
  };

  const handleNextStep = () => {
    setBookingStep(bookingStep + 1);
  };

  const handlePrevStep = () => {
    setBookingStep(bookingStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after successful submission
    setTimeout(() => {
      setBookingStep(1);
      setDate(undefined);
      setParticipants(1);
      setContactInfo({
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    }, 3000);
  };

  return (
    <section id="activities" className="py-16 md:py-24 bg-muted/50 px-8">
      <div>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-[#ffc845]/20 px-3 py-1 text-sm text-[#ffc845]">
            Nos Activités
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Découvrez & Explorez
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Immergez-vous dans l'histoire et la culture de la Médina de Tunis à
            travers nos activités soigneusement conçues.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="group overflow-hidden border-0 bg-transparent shadow-none transition-all"
            >
              <div className="relative h-[300px] overflow-hidden rounded-t-xl">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    {activity.shortDescription}
                  </p>
                </div>
              </div>
              <CardContent className="mt-4 space-y-4 px-0">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-background"
                  >
                    <Clock className="h-3 w-3" />
                    {activity.duration}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-background"
                  >
                    <Users className="h-3 w-3" />
                    Max {activity.maxParticipants}
                  </Badge>
                  {/* <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-background"
                  >
                    {activity.price}
                  </Badge> */}
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{activity.location}</span>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => handleBookNow(activity)}
                    className="w-full bg-[#008067] hover:bg-[#006a55]"
                  >
                    Réserver maintenant
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedActivity && (
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogContent className="sm:max-w-[600px]">
              {!isSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedActivity.title}</DialogTitle>
                    <DialogDescription>
                      {bookingStep === 1 &&
                        "Choisissez une date et le nombre de participants."}
                      {bookingStep === 2 &&
                        "Complétez vos informations de contact."}
                      {bookingStep === 3 &&
                        "Vérifiez les détails de votre réservation."}
                    </DialogDescription>
                  </DialogHeader>

                  {bookingStep === 1 && (
                    <div className="grid gap-6 py-4">
                      <div className="space-y-2">
                        <Label>Date de l'activité</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date
                                ? format(date, "PPP")
                                : "Sélectionnez une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="participants">
                          Nombre de participants
                        </Label>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setParticipants(Math.max(1, participants - 1))
                            }
                            disabled={participants <= 1}
                          >
                            -
                          </Button>
                          <Input
                            id="participants"
                            type="number"
                            className="mx-2 text-center"
                            value={participants}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value);
                              if (
                                !isNaN(value) &&
                                value >= 1 &&
                                value <= selectedActivity.maxParticipants
                              ) {
                                setParticipants(value);
                              }
                            }}
                            min={1}
                            max={selectedActivity.maxParticipants}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setParticipants(
                                Math.min(
                                  selectedActivity.maxParticipants,
                                  participants + 1
                                )
                              )
                            }
                            disabled={
                              participants >= selectedActivity.maxParticipants
                            }
                          >
                            +
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Maximum {selectedActivity.maxParticipants}{" "}
                          participants
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">
                          Points forts de l'activité:
                        </h4>
                        <ul className="ml-5 list-disc space-y-1 text-sm">
                          {selectedActivity.highlights.map(
                            (highlight: string, index: number) => (
                              <li key={index}>{highlight}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={contactInfo.name}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              name: e.target.value,
                            })
                          }
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              email: e.target.value,
                            })
                          }
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={contactInfo.phone}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+216 XX XXX XXX"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="specialRequests">
                          Demandes spéciales (optionnel)
                        </Label>
                        <Textarea
                          id="specialRequests"
                          value={contactInfo.specialRequests}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              specialRequests: e.target.value,
                            })
                          }
                          placeholder="Informations supplémentaires, besoins spécifiques..."
                        />
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-6 py-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">
                          {selectedActivity.title}
                        </h4>
                        <div className="mt-2 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span>
                              {date ? format(date, "PPP") : "Non sélectionnée"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Participants:
                            </span>
                            <span>{participants}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Prix unitaire:
                            </span>
                            <span>{selectedActivity.price}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>
                              {Number.parseInt(selectedActivity.price) *
                                participants}{" "}
                              DT
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Informations de contact</h4>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Nom:</span>{" "}
                            {contactInfo.name}
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              Email:
                            </span>{" "}
                            {contactInfo.email}
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              Téléphone:
                            </span>{" "}
                            {contactInfo.phone}
                          </p>
                          {contactInfo.specialRequests && (
                            <div className="mt-2">
                              <p className="text-muted-foreground">
                                Demandes spéciales:
                              </p>
                              <p className="mt-1">
                                {contactInfo.specialRequests}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted p-4 text-sm">
                        <p>
                          En confirmant cette réservation, vous acceptez nos
                          conditions générales et notre politique d'annulation.
                          Un email de confirmation vous sera envoyé avec tous
                          les détails de votre réservation.
                        </p>
                      </div>
                    </div>
                  )}

                  <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                    {bookingStep > 1 && (
                      <Button variant="outline" onClick={handlePrevStep}>
                        Retour
                      </Button>
                    )}
                    {bookingStep < 3 ? (
                      <Button
                        onClick={handleNextStep}
                        disabled={bookingStep === 1 && !date}
                        className="bg-[#008067] hover:bg-[#006a55]"
                      >
                        Continuer
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-[#008067] hover:bg-[#006a55]"
                      >
                        {isSubmitting
                          ? "Traitement en cours..."
                          : "Confirmer la réservation"}
                      </Button>
                    )}
                  </DialogFooter>
                </>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">
                    Réservation confirmée!
                  </h3>
                  <p className="text-muted-foreground">
                    Merci pour votre réservation. Un email de confirmation a été
                    envoyé à {contactInfo.email}.
                  </p>
                  <Button
                    onClick={() => setIsBookingOpen(false)}
                    className="mt-4 bg-[#008067] hover:bg-[#006a55]"
                  >
                    Fermer
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
