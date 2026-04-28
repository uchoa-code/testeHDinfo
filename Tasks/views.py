from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets

def index(request):
    return render(request, 'tasks/index.html')


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all().order_by('-createdAt')
        completed = self.request.query_params.get('completed')

        if completed is not None:
            queryset = queryset.filter(completed=completed.lower() == 'true')
        return queryset
    
    @action(detail=True, methods=['patch'])
    def completed(self, request, pk=None):
        task = self.get_object()
        task.completed = request.data.get('completed', task.completed)
        task.save()

        serializer = self.get_serializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)