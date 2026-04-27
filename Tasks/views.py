from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all().order_by('-createdAt')
        completed = self.request.query_params.get('completed')

        if completed is not None:
            queryset = queryset.filter(completed=completed.lower() == 'true')
        return queryset
    