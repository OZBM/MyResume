import React from "react";
import { Building, Clock, Users, Award, Hammer, ArrowRight } from "lucide-react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const TimelineItem = ({
  year,
  title,
  description,
}) => {
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-light">
          <Clock className="h-5 w-5" />
        </div>
        <div className="mt-2 h-full w-0.5 bg-secondary/20" />
      </div>
      <div className="flex flex-col pb-10">
        <Badge variant="outline" className="w-fit mb-2">
          {year}
        </Badge>
        <h3 className="text-xl font-semibold text-secondary">{title}</h3>
        <p className="mt-2 text-dark/70">{description}</p>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, description }) => {
  return (
    <Card className="p-6 flex flex-col gap-4 h-full">
      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="text-dark/70">{description}</p>
    </Card>
  );
};

const AboutUs = ({
  companyName = "BuildRight Construction",
  foundedYear = "1985",
  missionStatement = "To deliver exceptional construction services with integrity, innovation, and a commitment to excellence, creating spaces that stand the test of time."
}) => {
  return (
    <section id="about" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">About Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
              Building Excellence <span className="text-primary">Since {foundedYear}</span>
            </h2>
            <p className="text-lg mb-6 text-dark/80">
              {companyName} has been at the forefront of the construction industry for over three decades, delivering exceptional quality and innovative solutions for our clients. Our journey has been defined by our unwavering commitment to excellence, integrity, and customer satisfaction.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-dark/80">
                <strong className="text-secondary">Our Mission:</strong> {missionStatement}
              </p>
              <p className="text-dark/80">
                <strong className="text-secondary">Our Vision:</strong> To be the most trusted and respected construction company, known for our exceptional quality, innovation, and commitment to sustainability.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="values">Values</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Our Journey</h3>
                <div className="mt-6">
                  <TimelineItem
                    year={foundedYear}
                    title="Company Founded"
                    description="Our journey began with a small team of dedicated professionals committed to quality construction."
                  />
                  <TimelineItem
                    year="1995"
                    title="First Major Project"
                    description="Completed our first commercial high-rise, establishing our reputation for excellence."
                  />
                  <TimelineItem
                    year="2005"
                    title="Expansion"
                    description="Expanded operations to include residential developments and government contracts."
                  />
                  <TimelineItem
                    year="2015"
                    title="Sustainability Focus"
                    description="Pioneered sustainable construction methods, becoming an industry leader in green building."
                  />
                  <TimelineItem
                    year="2025"
                    title="Innovation Era"
                    description="Implementing cutting-edge technologies and processes to transform the construction landscape."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="values" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Our Core Values</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ValueCard
                    icon={<Award className="h-6 w-6" />}
                    title="Excellence"
                    description="We strive for excellence in every project, focusing on quality, precision, and attention to detail."
                  />
                  <ValueCard
                    icon={<Users className="h-6 w-6" />}
                    title="Integrity"
                    description="We operate with honesty, transparency, and ethical standards in all our business dealings."
                  />
                  <ValueCard
                    icon={<Hammer className="h-6 w-6" />}
                    title="Innovation"
                    description="We embrace innovative solutions and technologies to deliver superior results for our clients."
                  />
                  <ValueCard
                    icon={<Building className="h-6 w-6" />}
                    title="Sustainability"
                    description="We are committed to environmentally responsible practices and sustainable construction methods."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Our Leadership</h3>
                <p className="text-dark/80 mb-6">
                  Our team consists of industry experts with decades of combined experience in construction, engineering, architecture, and project management.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-4xl font-bold text-primary">250+</h3>
                    <p className="text-dark/70">Projects Completed</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-4xl font-bold text-primary">35+</h3>
                    <p className="text-dark/70">Years of Experience</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-4xl font-bold text-primary">150+</h3>
                    <p className="text-dark/70">Team Members</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
