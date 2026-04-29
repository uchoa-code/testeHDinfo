from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("Título muito curto")
        return value
    
    def validate_description(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Descrição muito curta")
        return value