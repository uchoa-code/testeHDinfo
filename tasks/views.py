from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


def index(request):
    return render(request, 'tasks/index.html')


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(user=self.request.user).order_by('-createdAt')
        completed = self.request.query_params.get('completed')

        if completed is not None:
            queryset = queryset.filter(completed=completed.lower() == 'true')

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'])
    def completed(self, request, pk=None):
        task = self.get_object()
        task.completed = request.data.get('completed', task.completed)
        task.save()

        serializer = self.get_serializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)