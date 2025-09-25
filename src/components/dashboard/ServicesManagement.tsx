import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Scissors,
  Plus,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Image,
  Save
} from "lucide-react";
import { useServices } from "@/contexts/ServicesContext";
import ServiceImageSelector from "@/components/ServiceImageSelector";

const ServicesManagement = () => {
  const { 
    services, 
    addService, 
    updateService, 
    deleteService, 
    toggleServiceActive 
  } = useServices();

  const [editingService, setEditingService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditService = (service: any) => {
    setEditingService({ ...service });
    setIsDialogOpen(true);
  };

  const handleAddService = () => {
    setEditingService({
      id: '',
      name: '',
      description: '',
      price: 0,
      duration: 30,
      category: "Men",
      active: true,
      image: ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveService = () => {
    if (editingService.id && services.find(s => s.id === editingService.id)) {
      // Update existing service
      updateService(editingService.id, editingService);
    } else {
      // Add new service
      addService(editingService);
    }
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    deleteService(serviceId);
  };

  const handleToggleServiceActive = (serviceId: string) => {
    toggleServiceActive(serviceId);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Services Management
          </CardTitle>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddService}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingService?.id ? 'Edit Service' : 'Add New Service'}
                </DialogTitle>
              </DialogHeader>
              
              {editingService && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input
                      id="service-name"
                      value={editingService.name}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        name: e.target.value
                      })}
                      placeholder="e.g., Premium Haircut"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description</Label>
                    <Input
                      id="service-description"
                      value={editingService.description || ''}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        description: e.target.value
                      })}
                      placeholder="Brief description of the service"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service-price">Price ($)</Label>
                      <Input
                        id="service-price"
                        type="number"
                        value={editingService.price}
                        onChange={(e) => setEditingService({
                          ...editingService,
                          price: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service-duration">Duration (min)</Label>
                      <Input
                        id="service-duration"
                        type="number"
                        value={editingService.duration}
                        onChange={(e) => setEditingService({
                          ...editingService,
                          duration: parseInt(e.target.value) || 30
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-category">Category</Label>
                    <Input
                      id="service-category"
                      value={editingService.category}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        category: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Service Image</Label>
                    <ServiceImageSelector
                      currentImage={editingService.image || ''}
                      onImageSelect={(image) => setEditingService({
                        ...editingService,
                        image: image
                      })}
                    >
                      <Button variant="outline" className="w-full justify-start">
                        <Image className="w-4 h-4 mr-2" />
                        {editingService.image ? 'Change Image' : 'Select Image'}
                      </Button>
                    </ServiceImageSelector>
                    {editingService.image && (
                      <div className="mt-2">
                        <img 
                          src={editingService.image} 
                          alt="Service preview" 
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="service-active">Active Service</Label>
                    <Switch
                      id="service-active"
                      checked={editingService.active}
                      onCheckedChange={(checked) => setEditingService({
                        ...editingService,
                        active: checked
                      })}
                    />
                  </div>
                  
                  <Button onClick={handleSaveService} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Service
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div 
              key={service.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{service.name}</h3>
                      {!service.active && (
                        <Badge variant="destructive" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${service.price}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.duration}min
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    checked={service.active}
                    onCheckedChange={() => handleToggleServiceActive(service.id)}
                  />
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {services.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Scissors className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No services configured yet</p>
              <Button className="mt-4" onClick={handleAddService}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Service
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesManagement;