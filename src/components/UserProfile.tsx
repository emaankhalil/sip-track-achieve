
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { User, Save, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import useLocalStorage from '@/hooks/useLocalStorage';

interface UserProfileData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  physicalActivities: string;
}

const UserProfile: React.FC = () => {
  const [profileData, setProfileData] = useLocalStorage<UserProfileData>('userProfile', {
    age: '',
    gender: '',
    height: '',
    weight: '',
    physicalActivities: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    toast("Profile updated successfully!", {
      description: "Your personal information has been saved."
    });
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const hasProfileData = profileData.age || profileData.gender || profileData.height || profileData.weight || profileData.physicalActivities;

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Tell About You</h3>
        </div>
        {!isEditing && hasProfileData && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        )}
      </div>

      {!isEditing && !hasProfileData ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Tell us about yourself to get personalized hydration recommendations.
          </p>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
          >
            Add Your Information
          </Button>
        </div>
      ) : !isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.age && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Age</Label>
                <p className="text-gray-800 font-medium">{profileData.age} years</p>
              </div>
            )}
            {profileData.gender && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Gender</Label>
                <p className="text-gray-800 font-medium capitalize">{profileData.gender}</p>
              </div>
            )}
            {profileData.height && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Height</Label>
                <p className="text-gray-800 font-medium">{profileData.height} cm</p>
              </div>
            )}
            {profileData.weight && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Weight</Label>
                <p className="text-gray-800 font-medium">{profileData.weight} kg</p>
              </div>
            )}
          </div>
          {profileData.physicalActivities && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Physical Activities</Label>
              <p className="text-gray-800 mt-1">{profileData.physicalActivities}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 25"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 170"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                min="50"
                max="250"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 70"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                min="20"
                max="300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Physical Activities</Label>
            <Textarea
              id="activities"
              placeholder="Describe your daily physical activities, exercise routine, or fitness level (e.g., sedentary office work, gym 3x/week, running, etc.)"
              value={formData.physicalActivities}
              onChange={(e) => setFormData(prev => ({ ...prev, physicalActivities: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserProfile;
